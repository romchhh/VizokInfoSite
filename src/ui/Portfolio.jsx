import React, { useState } from 'react';

function Portfolio() {
	const [selectedWork, setSelectedWork] = useState(null);

	const works = [
		{
			title: "Сервіс для входу/в'їзду в житловий комплекс",
			description: `
				Ласкаво просимо до <strong>TeleBot-Residential-Complex</strong>! Цей Telegram-бот дозволяє мешканцям подавати різноманітні запити, пов'язані з контролем доступу та безпекою на території житлового комплексу.<br><br>
		
				<strong>Можливості</strong><br>
				<ul>
					<li><strong>Подання запитів:</strong> Користувачі можуть надсилати такі запити, як пропуск пішохода, пропуск автомобіля або виклик охорони безпосередньо через бота.</li>
					<li><strong>Панель адміністратора:</strong> Адміністратори мають доступ до адмінпанелі, де вони можуть керувати заявками, переглядати статистику та виконувати адміністративні завдання.</li>
					<li><strong>Веб-інтерфейс:</strong> Запити, надіслані через бота, відображаються на локальній веб-сторінці для зручного перегляду співробітниками служби безпеки.</li>
				</ul>
		
				<strong>Можливості бота</strong><br>
				<ul>
					<li><strong>Пропустити пішохода:</strong> Мешканці можуть запитувати дозвіл на вхід пішоходів на територію житлового комплексу.</li>
					<li><strong>Пропустити автомобіль:</strong> Мешканці можуть запросити дозвіл на в'їзд транспортних засобів на територію житлового комплексу.</li>
					<li><strong>Викликати охорону:</strong> Мешканці можуть викликати охорону безпосередньо через бота.</li>
				</ul>
			`,
			image: 'public/portfolio1.png',
		},
		
		{
			title: 'Бот для планування та керування постами в Telegram-каналах',
			description: `
				<strong>✨ @PostponedPosterBot</strong> - ваш надійний помічник для відкладеного постингу!<br>
				<strong>Цей бот дозволяє вам:</strong><br>
				🕔 <strong>Планувати вихід публікацій</strong> у ваших каналах, щоб все було організовано.<br>
				🗑 <strong>Автоматично видаляти</strong> пости за розкладом, економлячи ваш час.<br>
				👩‍🎨 <strong>Створювати та налаштовувати</strong> пости будь-якого формату для максимального залучення вашої аудиторії.<br>
				👀 <strong>І багато іншого</strong> - відкрийте нові можливості для вашого контенту!<br><br>
				<strong>Долучайтеся до нас та зробіть ваш постинг простим та ефективним!</strong>
			`,
			image: 'public/portfolio2.png'
		
		},
		
		{
			title: 'Cosmy Telegram Bot',
			description: `
				Ласкаво просимо до <strong>Telegram-бота Cosmy Assistant</strong>! Цей бот - ваш помічник для управління замовленнями, доступу до служби підтримки та обміну відгуками - і все це у вашому улюбленому додатку для обміну повідомленнями, Telegram.<br><br>
		
				<strong>Функції</strong><br>
				<ul>
					<li><strong>Історія замовлень:</strong> Легко отримуйте та відображайте деталі вашого замовлення, включаючи інформацію про товар, статус замовлення та загальну суму.</li>
					<li><strong>Запити до служби підтримки:</strong> Звертайтеся безпосередньо до служби підтримки та отримуйте швидкі відповіді в робочий час.</li>
					<li><strong>Рейтинги та відгуки:</strong> Залишайте свої відгуки та оцінки про отриману послугу, щоб допомогти нам покращити її!</li>
					<li><strong>Зручний інтерфейс:</strong> Легко орієнтуйтеся у функціях бота завдяки чистому та інтуїтивно зрозумілому дизайну.</li>
					<li><strong>Асинхронна робота:</strong> Швидка та оперативна взаємодія завдяки асинхронним запитам до API.</li>
				</ul>
			`,
			image: 'public/portfolio3.png',
		},
		{
			title: 'Бот для управління арбатражем трафіку в телеграм',
			description: `
				<strong>Огляд</strong><br>
				Telegram-бот <strong>Traffic Arbitrage</strong> - це платформа, створена для полегшення купівлі-продажу трафіку між трафік-майстрами та адміністраторами Telegram-каналів. Бот виступає в ролі посередника, надаючи пропозиції (замовлення) і забезпечуючи комфортний робочий процес для обох сторін. Користувачі можуть отримувати оплату за залучення підписників до різних Telegram-каналів.<br><br>
		
				<strong>Можливості</strong><br>
				<ul>
					<li><strong>Підбір оферів:</strong> Користувачі можуть переглядати та обирати пропозиції за різними категоріями та каналами.</li>
					<li><strong>Генерація посилань:</strong> Користувачі можуть генерувати посилання-запрошення для обраних пропозицій.</li>
					<li><strong>Статистика:</strong> Користувачі можуть переглядати детальну статистику про свою ефективність і заробіток.</li>
					<li><strong>Управління платежами:</strong> Користувачі можуть керувати своїми платежами, в тому числі прив'язувати свої картки та запитувати виплати.</li>
					<li><strong>Реферальна система:</strong> Користувачі можуть запрошувати друзів і отримувати відсоток від заробітку своїх рефералів.</li>
					<li><strong>Мовні налаштування:</strong> Користувачі можуть вибрати бажану мову для інтерфейсу бота.</li>
				</ul>
			`,
			image: 'public/portfolio4.png',
		},
		
		{
			title: 'Тедеграм бот для Суши-бару',
			description: `
				Ласкаво просимо до <strong>Sushi Telegram Bot</strong> - вашого ідеального місця для замовлення смачних суші прямо зі свого додатку в Telegram!<br><br>
		
				<strong>Можливості</strong><br>
				<ul>
					<li><strong>Для користувачів:</strong></li>
					<ul>
						<li><strong>Ознайомтеся з меню:</strong> Перегляньте широкий вибір суші, включаючи роли, сети та макі.</li>
						<li><strong>Додати до кошика:</strong> Оберіть улюблені страви та додайте їх до кошика одним дотиком.</li>
						<li><strong>Оформлення замовлення:</strong> Легко робіть замовлення, вказавши свої контактні дані та підтвердивши вибір.</li>
						<li><strong>Підтвердження замовлення:</strong> Отримайте повідомлення з деталями вашого замовлення.</li>
					</ul>
					<li><strong>Для адміністраторів:</strong></li>
					<ul>
						<li><strong>Панель адміністратора:</strong> Доступ до налаштувань бота та аналітики.</li>
						<li><strong>Статистика:</strong> Відстежуйте активність користувачів і продажі.</li>
						<li><strong>Експорт бази даних:</strong> Експортуйте замовлення в Excel для подальшого аналізу.</li>
					</ul>
				</ul>
		
				<strong>Використання</strong><br>
				<ol>
					<li>Ознайомтеся з меню: Почніть розмову з ботом за допомогою команди <code>/start</code>.</li>
					<li>Додати в кошик: виберіть «Меню 📋» і додайте товари.</li>
					<li>Оформити замовлення: Перейдіть до кошика за допомогою «Кошик 🛒» і завершіть замовлення.</li>
				</ol>
			`,
			image: 'public/portfolio5.png',
		},
		{
			title: 'Salne Nice Device Bot - бот для перегляду техніки за фільтрами з можливістю додати своє оголошення',
			description: `
				Це <strong>Telegram-бот</strong>, створений для полегшення купівлі-продажу в Telegram-групах. Користувачі можуть переглядати оголошення, розміщувати товари на продаж і спілкуватися з продавцями.<br><br>
		
				<strong>Можливості</strong><br>
				<ul>
					<li><strong>Користувацький інтерфейс:</strong> Зручний інтерфейс для перегляду категорій, оголошень та розміщення товарів.</li>
					<li><strong>Фільтрація за категоріями:</strong> Легкий пошук товарів за категоріями.</li>
					<li><strong>Підтримка зображень:</strong> Користувачі можуть завантажувати фото товарів, роблячи оголошення більш привабливими.</li>
					<li><strong>Інтеграція з контактами:</strong> Легке ділення контактами в Telegram під час публікації оголошень.</li>
					<li><strong>Статистика:</strong> Адміністратори можуть бачити дані про активність користувачів та продажі.</li>
				</ul>
			`,
			image: 'public/portfolio8.png',
		},
		{
			title: 'TeddiMedBot - бот для дитячої приватної клініки',
			description: `
				<strong>Опис:</strong> Telegram-бот, який допомагає користувачам у плануванні візитів до лікарів, заповненні декларацій та постановці запитань. Бот також надає панель для управління та статистики.<br><br>
		
				<strong>Можливості:</strong>
				<ul>
					<li><strong>Запис до лікарів</strong></li>
					<li><strong>Заповнюйте декларації</strong></li>
					<li><strong>Задавайте питання:</strong> Отримуйте відповіді від лікарів</li>
					<li><strong>Панель адміністратора:</strong> Керування ботом та перегляд статистики</li>
				</ul>
			`,
			image: 'public/portfolio7.png',
		},
		{
			title: 'Media Cut Bot - бот для створення контенту',
			description: `
				<strong>@MediaKipCutBot</strong> - простий і зручний бот для створення контенту.<br><br>
		
				<strong>Бот дозволяє:</strong>
				<ul>
					<li>Шукати цікаві моменти в медіа та вирізати їх</li>
					<li>Накладати футажі</li>
					<li>Створювати та налаштовувати фільтри</li>
					<li>І багато іншого</li>
				</ul>
			`,
			image: 'public/portfolio6.png',
		},
		{
			title: 'FoodStickersBot для KyivTheFood',
			description: `
				<strong>FoodStickers-from-excel</strong> - Telegram-бот, що генерує текстові наклейки для страв з даних Excel-файлу. Бот спрощує створення стікерів для маркування страв.<br><br>
		
				<strong>Головне вікно:</strong> Зручний інтерфейс для завантаження Excel-файлів з інформацією про страви.<br><br>
		
				<strong>Приклад використання</strong><br>
				<ul>
					<li><strong>Завантаження файлу:</strong> Користувачі можуть завантажувати Excel-файли з інформацією про страви.</li>
					<li><strong>Вибір дати:</strong> Вкажіть дату приготування страви.</li>
					<li><strong>Генерація стікерів:</strong> Після вибору дати бот створює файл Word з наклейками, які можна друкувати.</li>
				</ul>
			`,
			image: 'public/portfolio9.png',
		},
	]		

	const openWork = (work) => {
		setSelectedWork(work);
	};

	const closeWork = () => {
		setSelectedWork(null);
	};

	return (
		<section id='portfolio' className='py-10'>
			<div className='container'>
				<div className='w-full text-center mb-10'>
					<h2 className='text-3xl font-bold mb-5'>Наші проєкти</h2>
					<hr className='border-t-2 border-gray-300 mx-auto w-1/4 mb-5' />
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{works.map((work, index) => (
						<div
							key={index}
							onClick={() => openWork(work)}
							className='block overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer'
						>
							<img
								src={work.image}
								alt={work.title}
								className='w-full h-96 object-cover' // Встановлюємо більшу максимальну висоту
							/>
							<h3 className='text-lg font-semibold text-center mt-2'>{work.title}</h3>
						</div>
					))}
				</div>

				{selectedWork && (
					<div
						className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
						onClick={closeWork}
					>
						<div
							className='bg-white rounded-lg p-8 max-w-full w-11/12 max-h-[80vh] relative overflow-auto' // Встановлюємо 80% висоти екрану
							onClick={(e) => e.stopPropagation()} // Зупинити пропагацію натисків, щоб закрити
						>
							<button
								onClick={closeWork}
								className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl'
							>
								&times;
							</button>
							<img
								src={selectedWork.image}
								alt={selectedWork.title}
								className='w-full h-auto max-h-[80vh] object-contain rounded-lg mb-4' // Встановлюємо максимальну висоту до 80% від висоти екрана
							/>
							<h2 className='text-2xl font-bold mb-2'>{selectedWork.title}</h2>
							<p className='text-gray-700' dangerouslySetInnerHTML={{ __html: selectedWork.description }} />
					
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default Portfolio;
