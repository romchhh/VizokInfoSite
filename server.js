// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async(req, res) => {
    const { name, phone } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'romanbiznesssmen@gmail.com', // Замість цього використайте свою електронну адресу
            pass: 'gpfm qbzg uccv zajf' // І пароль або App Password, якщо у вас ввімкнено двофакторну автентифікацію
        }
    });

    const mailOptions = {
        from: 'romanbiznesssmen@gmail.com',
        to: 'roman.fedoniuk@gmail.com',
        subject: 'Нове повідомлення з форми для телеграм ботів.',
        text: `Ім'я: ${name}\nТелефон: ${phone}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

// Додаємо проксі для вебхуків
app.post('/api/webhook-proxy', async (req, res) => {
    try {
        console.log('Proxying webhook request:', req.body);
        
        // Відправляємо запит на HTTP сервер
        const response = await fetch('http://139.59.208.152:8001/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        
        if (response.ok) {
            console.log('✅ Webhook proxied successfully');
            res.json({ success: true, message: 'Webhook sent successfully' });
        } else {
            console.log('⚠️ Webhook proxy failed:', response.status);
            res.status(response.status).json({ success: false, message: 'Webhook failed' });
        }
    } catch (error) {
        console.error('❌ Webhook proxy error:', error);
        res.status(500).json({ success: false, message: 'Proxy error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});