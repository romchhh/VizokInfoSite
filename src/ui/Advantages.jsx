import React from 'react';
import Advantage from './Advantage';
import Button from './Button';
import './Advantages.css'; // Імпортуємо CSS-файл

const ADVANTAGES = [
	{
		img: 'advantage_1.PNG',
		title: 'ДОСВІД',
		description:
			'Ми займаємося розробкою Telegram ботів з 2021 року. Наш досвід допомагає створювати рішення для будь-яких задач клієнтів.',
	},
	{
		img: 'advantage_2.PNG',
		title: 'ШВИДКІСТЬ',
		description:
			'Наш досвід і оптимізовані процеси дозволяють нам розробляти боти швидко, не жертвуючи якістю та надійністю.',
	},
	{
		img: 'advantage_6.PNG',
		title: 'ФУНКЦІОНАЛЬНІСТЬ',
		description:
			'Ми розробляємо багатофункціональні чат-боти, які підтримують повідомлення, обробку заявок, платежі та багато іншого.',
	},
	{
		img: 'advantage_4.PNG',
		title: 'ІНДИВІДУАЛЬНИЙ ПІДХІД',
		description:
			'Кожен бот розробляється з урахуванням потреб клієнта, щоб задовольнити специфічні вимоги бізнесу.',
	},
	{
		img: 'advantage_5.PNG',
		title: 'ТЕХНІЧНА ПІДТРИМКА',
		description:
			'Забезпечуємо технічну підтримку та обслуговування ваших ботів, щоб гарантувати їх стабільну роботу.',
	},
	{
		img: 'advantage_7.PNG',
		title: 'КОМАНДА ПРОФЕСІОНАЛІВ',
		description:
			'Наша команда має досвід роботи з Telegram API та сучасними технологіями для створення надійних рішень.',
	},
	{
		img: 'advantage_3.PNG',
		title: 'ІНТЕГРАЦІЇ',
		description:
			'Можемо інтегрувати ваш бот із зовнішніми системами та платформами для автоматизації бізнес-процесів.',
	},
	{
		img: 'advantage_8.PNG',
		title: 'ПЕРСОНАЛІЗАЦІЯ',
		description:
			'Ми надаємо можливість створити унікальні Telegram боти для бізнесу з персоналізованим дизайном та функціоналом.',
	},
];

function Advantages() {
	return (
		<section
			className='min-h-screen advantages flex flex-col justify-center items-center gap-24 py-10'
			id='advantages'
		>
			<h2 className='text-4xl font-bold text-black'>Наші переваги</h2>
			<div className='container grid xl:grid-cols-4 gap-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center content-center'>
				{ADVANTAGES.map((advantage, index) => (
					<div className='advantage-item' key={index}>
						<Advantage
							src={advantage.img}
							title={<span className="text-black">{advantage.title}</span>}
							index={index + 1}
						>
							<p className="text-black">{advantage.description}</p>
						</Advantage>
					</div>
				))}
			</div>
			<div>
				<a href='https://t.me/nowayrm' target='_blank' rel='noopener noreferrer'>
					<Button className='text-white'>Зв'яжіться з нами</Button>
				</a>
			</div>
		</section>
	);
}

export default Advantages;
