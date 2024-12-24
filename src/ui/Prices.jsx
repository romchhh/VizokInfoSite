import React from 'react';
import { useInView } from 'react-intersection-observer';
import Button from './Button';

const TRAVEL_OPTIONS = [
  {
    title: 'Спільні подорожі',
    description: 'Зробіть ваші мандрівки комфортнішими, розділяючи маршрут з новими знайомими.',
    features: [
      'Інтуїтивне планування поїздок',
      'Зручна система відгуків',
      'Пошук попутників поруч із вами',
    ],
    actionText: 'Почати подорож',
    actionLink: 'https://t.me/VizokUAbot',
  },
  {
    title: 'Спільні поїздки',
    description: 'Діліться поїздками, заощаджуйте на витратах і робіть внесок у збереження екології.',
    features: [
      'Пошук водіїв і пасажирів',
      'Зменшення витрат на транспорт',
      'Зменшення викидів CO₂',
    ],
    actionText: 'Знайти попутників',
    actionLink: 'https://t.me/VizokUAbot',
  },
  {
    title: 'Розділ подорожей',
    description: 'Відкрийте для себе нові місця разом із попутниками. Поділіться витратами та насолоджуйтеся подорожами.',
    features: [
      'Спільна оплата витрат',
      'Дружнє спілкування в дорозі',
      'Підтримка місцевого туризму',
    ],
    actionText: 'Приєднатися до подорожі',
    actionLink: 'https://t.me/VizokUAbot',
  },
];

function TravelOptions() {
  const { ref: travelRef, inView: travelInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className='min-h-screen travel-options flex flex-col justify-center items-center gap-24 py-10'
      id='travel-options'
    >
      <h2 className='text-4xl font-bold text-black'>Можливості для спільних поїздок</h2>
      <div
        ref={travelRef}
        className={`container grid xl:grid-cols-3 gap-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center content-center transition-opacity duration-1000 ${
          travelInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {TRAVEL_OPTIONS.map((option, index) => (
          <div
            className='travel-item p-6 border rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl'
            key={index}
          >
            <h3 className='text-2xl font-bold mb-4'>{option.title}</h3>
            <p className='text-lg mb-2'>{option.description}</p>
            <div className='features text-left'>
              <h4 className='font-semibold mb-2'>Переваги:</h4>
              <ul className='list-disc list-inside space-y-1'>
                {option.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <a
              href={option.actionLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className='bg-blue-500 text-white px-4 py-2 rounded-full mt-6'>
                {option.actionText}
              </Button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TravelOptions;
