import Auction from './Auction';
import Button from './Button';

function About() {
	return (
		<section id='about' className='min-h-screen about relative flex flex-col'>
	<div className='container flex-1 flex items-center'>
		<div className='w-full flex md:justify-end justify-center items-center'>
			<div className='2xl:max-w-[500px] md:max-w-[400px] w-full px-10 md:px-0 flex flex-col gap-7 text-lg z-40 py-10 xl:py-0'>
				<h2 className='text-5xl font-bold text-center'><br />Про нас</h2>
				<p className='font-bold text-xl'>
					TeleBots - це молода але досвідчена команда, яка займається розробкою чат-ботів в телеграм, Вайбері, Інстаграмі.
				</p>
				<p className='text-lg font-semibold'>
					Чіткі терміни та якісний підхід до роботи на всіх етапах є візитною карткою команди.
				</p>
				<p className='text-lg font-semibold'>
					В TeleBots ми спеціалізуємося на створенні Telegram ботів, кастомних скриптів та повністю адаптивних веб-сайтів.
				</p>
				<p className='text-lg font-semibold'>
					Ми будуємо бізнес по-європейськи! Позаштатне гасло компанії «задоволений клієнт - вище доходів», тому у нас 101% задоволених клієнтів!
				</p>
				<p className='text-lg font-semibold'>
					Ми на зв'язку 24/7, тому залишайте вашу заявку в формі, або пишіть нам на телеграм і ми безкоштовно прокунсультуємо вас!				</p>


					<div className='flex justify-center'>
						<a href='https://t.me/nowayrm' target='_blank' rel='noopener noreferrer'>
							<Button className='text-white'>Зв'яжіться з нами</Button>
						</a>
					</div>
					</div>
				</div>
			</div>
			<div className='w-full bg-white py-5 z-40'>
				<div className='container flex items-center lg:justify-between gap-12 lg:gap-4 xl:gap-0 flex-wrap justify-center'>
					<Auction src='adesa.png' alt='adesa auction' />
					<Auction src='iaai.png' alt='iaai auction' />
					<Auction src='copart.png' alt='copart auction' />
					<Auction src='partners.png' alt='partners auction' />
					<Auction src='shabo.png' alt='partners auction' />
					<Auction src='manheim.png' alt='manheim auction' />
					<Auction src='culture.png' alt='manheim auction' />
					<Auction src='cosmy.jpg' alt='manheim auction' />
					<Auction src='carmax.png' alt='carmax auction' className='max-h-10' />
				</div>
			</div>
		</section>
	);
}

export default About;
