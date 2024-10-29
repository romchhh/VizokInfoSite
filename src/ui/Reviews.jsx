function Reviews() {
	const reviews = [
		{
			name: 'Данііл Бережанський',
			text: 'Чудовий сервіс! Я дуже задоволений. Хоч і виникли проблеми на етапі розробки, але команда допомогла їх вирішити.',
			photo: 'public/photo1.png', // Заміни на шлях до фото
		},
		{
			name: 'Андрій Коваль (Власник мережі телеграм каналів з фільмами)',
			text: 'Роботою дуже задоволений, вдалось реалізувати мою ідею з ботом, дослухались до моїх думок і підказували на етапі розробки функціоналу. Тому раджу кожному хто задумується над створенням бота. Дякую',
			photo: 'public/photo2.png',
		},
		{
			name: 'Роман (Власник телеграм платформи для арбітражу трафіку)',
			text: 'И спасибо тебе за бота, Очень классный и удобный бот получился⚡️',
			photo: 'public/photo3.png',
		},
		{
			name: 'Анна Коваленко',
			text: 'Відмінний сервіс, констультували на кожному етапі розробки бота, дякую за допомогу!',
			photo: 'public/photo4.png',
		},
		{
			name: 'Богдан Тимченко (Співвласник мережі магазину косметики Cosmy)',
			text: 'Все пройшло на вищому рівні. Ви молодець, дякую 🙏🏻',
			photo: 'public/photo5.png',
		},
		{
			name: 'Софія Павлік (Дизайнер)',
			text: 'Команда допомогала мені з стартапом з першого етапу, консультували, пропонували, були повністю задіяні в проєкті, якщо плануєте розробку чат-бота, звертайтесь до цієї команди, не пожалієте. 10 з 10❤️',
			photo: 'public/photo6.png',
		},
		{
			name: 'Андрій Костюков  (СЕО компанії)',
			text: 'Після кількох невдалих спроб знайти професійний сервіс для мого стартапу, я нарешті натрапив на цей проєкт. Мені потрібно було розробити спеціальне рішення для бізнесу, і я навіть не очікував, що результат буде настільки якісним. Робота була зроблена швидко та бездоганно, а комунікація на найвищому рівні. Тепер я рекомендую цей сервіс всім своїм друзям і партнерам!',
			photo: 'public/photo7.png',
		},
		{
			name: 'Вiталiй Левченко',
			text: 'Привіт, воу оце крутяк ☺️. Наша компанія шукала спосіб швидко та якісно покращити підтримку клієнтів, адже останнім часом почали зявлятися скарги на повільну відповідь. Завдяки цьому сервісу ми отримали чудове рішення, і тепер клієнти задоволені як ніколи! Команда зробила все на відмінно, і я надзвичайно вдячна за професіоналізм. Завдяки вам ми не лише покращили наш сервіс, а й змогли залучити більше клієнтів.',
			photo: 'public/photo8.png',
		},
		{
			name: 'Григорій Малюк',
			text: 'Я завжди скептично ставився до сервісів, адже рідко зустрічаю якість, яка б мене задовольнила. Проте після співпраці з цією командою я зрозумів, що існують справжні професіонали! З першої консультації я відчув, що маю справу з компетентними людьми, і результат перевершив усі мої очікування. Сервіс — 10 з 10, точно буду рекомендувати друзям!',
			photo: 'public/photo9.png',
		},
	];

	return (
		<section id='reviews' className='py-10'>
			<div className='container'>
				<div className='w-full text-center mb-10'>
					<h2 className='text-3xl font-bold mb-5'>Відгуки клієнтів</h2>
					<hr className='border-t-2 border-gray-300 mx-auto w-1/4 mb-5' />
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{reviews.map((review, index) => (
						<div key={index} className='bg-white p-5 rounded-lg shadow-lg'>
							<img 
								src={review.photo} 
								alt={review.name} 
								className='w-24 h-24 rounded-full mx-auto mb-4' 
							/>
							<h3 className='text-lg font-semibold text-center'>{review.name}</h3>
							<p className='text-gray-600 text-center'>{review.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Reviews;