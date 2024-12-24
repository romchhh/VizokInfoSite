import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaRegHandshake,
  FaMapMarkerAlt,
  FaUsers,
  FaCarAlt,
} from 'react-icons/fa';
import { GiTrafficCone } from 'react-icons/gi';
import { RiCarFill } from 'react-icons/ri';
import PurchaseItem from './PurchaseItem';

// Оновлений масив з новими іконками та описами для сервісу спільних поїздок
const PURCHASES = [
  {
    img: <FaRegHandshake size={24} className="icon" />,
    title: 'Заявка на поїздку',
    description: 'Залиште заявку на нашій платформі або через Telegram, і ми зв\'яжемося з вами для підтвердження поїздки.',
  },
  {
    img: <FaMapMarkerAlt size={24} className="icon" />,
    title: 'Пошук попутників',
    description: 'Шукайте попутників на вашому маршруті або приєднуйтесь до існуючих поїздок за допомогою нашої платформи.',
  },
  {
    img: <FaUsers size={24} className="icon" />,
    title: 'Консультація та планування',
    description: 'Ми допоможемо вам спланувати поїздку та знайти найкращі варіанти для комфортного спільного подорожування.',
  },
  {
    img: <RiCarFill size={24} className="icon" />,
    title: 'Оренда транспорту',
    description: 'Ми надаємо зручні варіанти оренди транспорту для вашої поїздки або допомагаємо знайти попутника з власним авто.',
  },
  {
    img: <GiTrafficCone size={24} className="icon" />,
    title: 'Перевірка безпеки',
    description: 'Ми забезпечуємо безпеку вашої поїздки, перевіряючи водіїв та попутників, щоб гарантувати комфорт і безпеку на маршруті.',
  },
  {
    img: <FaCarAlt size={24} className="icon" />,
    title: 'Запуск поїздки',
    description: 'Ми забезпечуємо запуск поїздки, координуємо водіїв та пасажирів для зручного початку подорожі.',
  },
];

function Purchase() {
  const { ref: purchasesRef, inView: purchasesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id='purchase-scheme'
      className='min-h-screen flex items-center justify-center py-5'
    >
      <div className='container flex flex-col gap-24'>
        <h2 className='text-5xl font-bold lg:text-left text-center'>
          Як ми працюємо?
        </h2>
        <div
          ref={purchasesRef}
          className={`inline-flex gap-4 flex-wrap justify-center m-auto transition-opacity duration-1000 ${purchasesInView ? 'opacity-100' : 'opacity-0'}`}
        >
          {PURCHASES.map((item, index) => (
            <PurchaseItem index={index + 1} title={item.title} key={index} description={item.description}>
              {item.img}
            </PurchaseItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Purchase;
