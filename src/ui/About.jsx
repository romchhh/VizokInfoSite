import React from 'react';
import { useInView } from 'react-intersection-observer';
import Button from './Button';

function About() {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id='about' className='min-h-screen about relative flex flex-col'>
      <div className='container flex-1 flex items-center'>
        <div className='w-full flex md:justify-end justify-center items-center'>
          <div
            ref={textRef}
            className={`2xl:max-w-[500px] md:max-w-[400px] w-full px-10 md:px-0 flex flex-col gap-7 text-lg z-40 py-10 xl:py-0 transition-opacity duration-1000 ${
              textInView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className='text-5xl font-bold text-center'>
              <br />Про нас
            </h2>
            <p className='text-xl font-semibold'>
              Ми створили цей сервіс, щоб зробити ваші поїздки комфортними, зручними та безпечними! 🚗
            </p>
            <p className='text-xl font-semibold'>
              🌍 <strong>Що пропонує наш бот?</strong>
            </p>
            <p className='text-xl'>
              <strong>Для водіїв:</strong>
              <ul className='list-disc pl-6'>
                <li>Легке створення пропозицій поїздок із детальним описом маршруту, часу та інформації про автомобіль.</li>
                <li>Зручний перегляд і редагування своїх поїздок у будь-який час.</li>
              </ul>
            </p>
            <p className='text-xl'>
              <strong>Для пасажирів:</strong>
              <ul className='list-disc pl-6'>
                <li>Швидкий пошук поїздок за маршрутом, датою та іншими параметрами.</li>
                <li>Можливість напряму зв'язатися з водієм.</li>
                <li>Перегляд детальної інформації про водія та транспортний засіб.</li>
                <li>Можливість залишати відгуки про водія навіть якщо поїздка не відбулась.</li>
              </ul>
            </p>
            <p className='text-xl font-semibold'>
              📞 <strong>Якщо у вас є питання чи пропозиції, звертайтеся до нашої підтримки:</strong>{' '}
              <a
                href='https://t.me/Pavlo_Gromada'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline'
              >
                Підтримка
              </a>
            </p>
            <div className='flex justify-center'>
              {/* <a href='https://t.me/nowayrm' target='_blank' rel='noopener noreferrer'>
                <Button className='text-white'>Знайти поїздку</Button>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
