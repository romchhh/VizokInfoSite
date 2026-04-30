// Простіші утиліти для роботи з Telegram WebApp

// Перевірка доступності Telegram WebApp
export const isTelegramWebApp = () => {
    return !!(window.Telegram && window.Telegram.WebApp);
};

// Отримання об'єкта Telegram WebApp
export const getTelegramWebApp = () => {
    return window.Telegram?.WebApp || null;
};

// Ініціалізація WebApp
export const initTelegramWebApp = () => {
    const tg = getTelegramWebApp();
    if (!tg) {
        console.log('❌ Telegram WebApp not available');
        return false;
    }

    console.log('🔍 Initializing Telegram WebApp');
    console.log('Version:', tg.version);
    console.log('Platform:', tg.platform);

    try {
        // Повідомляємо що WebApp готовий
        if (typeof tg.ready === 'function') {
            tg.ready();
            console.log('✅ WebApp ready() called');
        }

        // Розширюємо WebApp
        if (typeof tg.expand === 'function') {
            tg.expand();
            console.log('✅ WebApp expanded');
        }

        return true;
    } catch (error) {
        console.error('❌ WebApp initialization failed:', error);
        return false;
    }
};

// Налаштування головної кнопки
export const setupMainButton = (text, onClick) => {
    const tg = getTelegramWebApp();
    if (!tg || !tg.MainButton) {
        console.log('❌ MainButton not available');
        return false;
    }

    try {
        tg.MainButton.text = text;
        tg.MainButton.show();
        tg.MainButton.onClick(onClick);
        console.log('✅ Main button configured:', text);
        return true;
    } catch (error) {
        console.error('❌ Main button setup failed:', error);
        return false;
    }
};

// Приховування головної кнопки
export const hideMainButton = () => {
    const tg = getTelegramWebApp();
    if (tg && tg.MainButton) {
        try {
            tg.MainButton.hide();
            console.log('✅ Main button hidden');
        } catch (error) {
            console.error('❌ Failed to hide main button:', error);
        }
    }
};

// Перевірка HTTPS (Telegram вимагає безпечного з'єднання)
const isSecureConnection = () => {
    return window.location.protocol === 'https:' || window.location.hostname === 'localhost';
};

// Основна функція закриття WebApp (спрощена версія)
export const closeTelegramWebApp = (data = null) => {
    console.log('🔄 Attempting to close Telegram WebApp...');
    
    // Перевіряємо безпечне з'єднання
    if (!isSecureConnection()) {
        console.warn('⚠️ WebApp requires HTTPS connection');
        alert('⚠️ Для коректної роботи потрібне HTTPS з\'єднання');
        return;
    }

    const tg = getTelegramWebApp();
    
    if (!tg) {
        console.log('❌ Not in Telegram WebApp context');
        // Fallback для звичайного браузера
        alert('✅ Дію виконано! Можете закрити цю сторінку.');
        try {
            window.close();
        } catch (e) {
            console.log('Cannot close window from script');
        }
        return;
    }

    console.log('✅ Telegram WebApp detected, version:', tg.version);
    
    // Приховуємо головну кнопку перед закриттям
    hideMainButton();
    
    // Зберігаємо дані перед закриттям (якщо потрібно)
    if (data) {
        try {
            localStorage.setItem('webapp_close_data', JSON.stringify({
                ...data,
                timestamp: Date.now()
            }));
            console.log('✅ Data saved before closing');
        } catch (error) {
            console.log('❌ Failed to save data:', error);
        }
    }

    // Основний метод закриття - window.Telegram.WebApp.close()
    if (typeof tg.close === 'function') {
        try {
            console.log('✅ Calling window.Telegram.WebApp.close()');
            tg.close();
            return;
        } catch (error) {
            console.error('❌ tg.close() failed:', error);
        }
    } else {
        console.log('❌ tg.close() method not available');
    }

    // Fallback 1: Відправка команди боту через sendData
    if (typeof tg.sendData === 'function') {
        try {
            console.log('✅ Trying fallback: sendData');
            const closeCommand = JSON.stringify({
                action: 'close_webapp',
                timestamp: Date.now(),
                ...data
            });
            tg.sendData(closeCommand);
            
            // Спробуємо закрити через короткий час
            setTimeout(() => {
                if (typeof tg.close === 'function') {
                    tg.close();
                }
            }, 1000);
            return;
        } catch (error) {
            console.error('❌ sendData fallback failed:', error);
        }
    }

    // Fallback 2: Показ кнопки "Назад"
    if (tg.BackButton && typeof tg.BackButton.show === 'function') {
        try {
            console.log('✅ Showing back button as fallback');
            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                if (typeof tg.close === 'function') {
                    tg.close();
                } else {
                    window.history.back();
                }
            });
            
            // Показуємо повідомлення користувачу
            if (typeof tg.showAlert === 'function') {
                tg.showAlert('✅ Дію виконано!\n\nНатисніть кнопку "Назад" ← щоб повернутися в бот.');
            }
            
            return;
        } catch (error) {
            console.error('❌ BackButton fallback failed:', error);
        }
    }

    // Fallback 3: Повідомлення користувачу з інструкціями
    const message = '✅ Дію виконано!\n\nДля повернення в бот:\n• Натисніть кнопку "Назад" ←\n• Або закрийте цю сторінку';
    
    if (typeof tg.showPopup === 'function') {
        tg.showPopup({
            title: '✅ Готово!',
            message: message,
            buttons: [{
                type: 'ok',
                text: 'Зрозуміло'
            }]
        });
    } else if (typeof tg.showAlert === 'function') {
        tg.showAlert(message);
    } else {
        alert(message);
    }
    
    console.log('ℹ️ All close methods attempted, showing user instructions');
};

// Відкрити бот в новій вкладці
export const openBot = () => {
    try {
        window.open('https://t.me/VizokUAbot', '_blank');
        console.log('✅ Bot opened in new tab');
    } catch (error) {
        console.error('❌ Failed to open bot:', error);
    }
};

// Комбінований метод: спробувати закрити, якщо не вдалося - відкрити бот
export const closeOrOpenBot = (data = null) => {
    // Спочатку пробуємо закрити
    closeTelegramWebApp(data);
    
    // Якщо через 2 секунди сторінка все ще відкрита, відкриваємо бот
    setTimeout(() => {
        if (document.visibilityState === 'visible') {
            console.log('🔄 WebApp still open, opening bot as fallback');
            openBot();
        }
    }, 2000);
};

// Створення функції для кнопки закриття
export const createCloseButton = (buttonText = 'Закрити додаток') => {
    const button = document.createElement('button');
    button.textContent = buttonText;
    button.onclick = () => closeTelegramWebApp();
    button.style.cssText = `
        padding: 12px 24px;
        background-color: var(--tg-theme-button-color, #0088cc);
        color: var(--tg-theme-button-text-color, white);
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        margin: 10px 0;
    `;
    return button;
};

// Створюємо глобальний об'єкт для зручності
export const telegramWebApp = {
    init: initTelegramWebApp,
    close: closeTelegramWebApp,
    setupMainButton: setupMainButton,
    hideMainButton: hideMainButton,
    closeOrOpenBot: closeOrOpenBot,
    openBot: openBot,
    createCloseButton: createCloseButton,
    isAvailable: isTelegramWebApp,
    get: getTelegramWebApp
}; 