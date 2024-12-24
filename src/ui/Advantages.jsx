import React from 'react';
import { useInView } from 'react-intersection-observer';
import Advantage from './Advantage';
import Button from './Button';
import './Advantages.css'; // Імпортуємо CSS-файл

const ADVANTAGES = [
  {
    img: 'advantage_1.PNG',
    title: 'ЕФЕКТИВНІСТЬ ПОЇЗДОК',
    description:
      'Наш сервіс дозволяє вам швидко знайти спільні поїздки, знижуючи витрати на паливо та час у дорозі, обираючи найбільш зручні маршрути.',
  },
  {
    img: 'advantage_2.PNG',
    title: 'ГНУЧКІСТЬ',
    description:
      'Ви можете самостійно створювати поїздки, редагувати їх, а також обирати поїздки, що найбільше відповідають вашим вимогам та розкладу.',
  },
  {
    img: 'advantage_6.PNG',
    title: 'БЕЗПЕКА',
    description:
      'Наш сервіс гарантує безпеку поїздок завдяки ретельній перевірці водіїв та можливості залишати відгуки про поїздки.',
  },
  {
    img: 'advantage_4.PNG',
    title: 'ПРОСТОТА ВИКОРИСТАННЯ',
    description:
      'Інтуїтивно зрозумілий інтерфейс дозволяє легко знайти, створити та відредагувати поїздки без зайвих складнощів.',
  },
  {
    img: 'advantage_5.PNG',
    title: 'ПІДТРИМКА КОРИСТУВАЧІВ',
    description:
      'Наш сервіс має команду підтримки, яка готова допомогти вам у будь-який час, щоб забезпечити комфорт та вирішення питань.',
  },
  {
    img: 'advantage_7.PNG',
    title: 'ШИРОКА АУДИТОРІЯ',
    description:
      'Ми об’єднуємо водіїв і пасажирів, дозволяючи вам знаходити поїздки з будь-якими параметрами, створюючи спільноти для зручності.',
  },
  {
    img: 'advantage_3.PNG',
    title: 'ГАРМОНІЯ МАРШРУТІВ',
    description:
      'Наш сервіс дозволяє знаходити найбільш оптимальні маршрути та поїздки, що точно відповідають вашим вимогам і графіку.',
  },
  {
    img: 'advantage_8.PNG',
    title: 'ПЕРСОНАЛІЗОВАНИЙ ПІДХІД',
    description:
      'Ми адаптуємо сервіс під ваші потреби, допомагаючи знаходити ідеальні поїздки на основі ваших переваг та вимог.',
  },
];

function Advantages() {
  const { ref: advantagesRef, inView: advantagesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className='min-h-screen advantages flex flex-col justify-center items-center gap-24 py-10'
      id='advantages'
    >
      <h2 className='text-4xl font-bold text-black'>Наші переваги</h2>
      <div
        ref={advantagesRef}
        className={`container grid xl:grid-cols-4 gap-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center content-center transition-opacity duration-1000 ${
          advantagesInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
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
        <a href='https://t.me/VizokUAbot' target='_blank' rel='noopener noreferrer'>
          <Button className='text-white'>Знайти поїздку</Button>
        </a>
      </div>
    </section>
  );
}

export default Advantages;
