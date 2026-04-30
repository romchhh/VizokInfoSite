import React, { useState } from 'react';

function Portfolio() {
    const [selectedWork, setSelectedWork] = useState(null);

    const works = [
        {
            title: "Розіграш 20.12.2024",
            description: `
                <p>20 грудня 2024 року відбувся розіграш призів серед клієнтів <strong>Vizok.info</strong>. 
                Ми щиро дякуємо усім учасникам за активність та довіру до нашого сервісу!</p>
                Переможці розіграшу призів за активність в грудні 2024 року:<br>
                • Савченко Дмитро - Київ;<br>
                • Тирлеш Дмитро - Івано-Франківськ;<br>
                • Кривицький Олександр - Тернопіль (фото)<br>
                Всі виграли провідні навушники Hf Jbl t110
                <p>Не пропустіть наступний розіграш! Скористайтеся послугами <strong>Vizok.info</strong>, щоб взяти участь.</p>
            `,
            image: 'giveaway2024.png',
            alt: 'Зображення розіграшу 20.12.2024'
        },
        {
            title: "Розіграш 19.01.2025",
            description: `
                <p>19 січня 2025 року відбувся розіграш призів серед клієнтів <strong>Vizok.info</strong>. 
                Ми щиро дякуємо усім учасникам за активність та довіру до нашого сервісу!</p>
                Переможці розіграшу призів за активність в січні 2025 року:<br>
                • Андрій з Вінниці;<br>
                • Дмитро з Комарно;<br>
                • Владислав з Києва:<br>
                Всі виграли провідні навушники Hf Jbl t110
                <p>Не пропустіть наступний розіграш! Скористайтеся послугами <strong>Vizok.info</strong>, щоб взяти участь.</p>
            `,
            image: 'give.png',
            alt: 'Зображення розіграшу 20.12.2024'
        },
    ];

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
            <h2 className='text-3xl font-bold mb-5'>Наші Розіграші</h2>
            <hr className='border-t-2 border-gray-300 mx-auto w-1/4 mb-5' />
            </div>

            <div className='text-gray-700 mb-10'>
            <h3 className='text-2xl font-semibold mb-4'>Щомісячний розіграш призів від Vizok.info</h3>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                <h4 className='text-xl font-semibold mb-4'>Правила проведення розіграшу призів</h4>
                <ol className='list-decimal pl-8 space-y-3'>
                <li>
                    <span className='font-semibold'>Умови участі:</span> У розіграші беруть участь усі користувачі, які протягом місяця активно користувалися послугами телеграм-бота Vizok (оголошували поїздки, перевозили пасажирів, вантажі або посилки), тобто водії та яким виповнилось 18 років на момент реєстрації в боті Vizok.
                </li>
                <li>
                    <span className='font-semibold'>Період акції:</span> Розіграш проводиться щомісяця. Учасниками стають усі клієнти, які скористалися послугами бота Vizok як водії, в період, з першого до останнього дня місяця.
                </li>
                <li>
                    <span className='font-semibold'>Призи:</span>
                    <ul className='list-disc pl-8'>
                    <li>У розіграші передбачено п’ятнадцять конвертів із призами: один генеральний, три додаткових, решта — сувенірні подарунки.</li>
                    <li>Учасники обирають конверти у порядку відповіді на дзвінок.</li>
                    </ul>
                </li>
                <li>
                    <span className='font-semibold'>Процес розіграшу:</span>
                    <ul className='list-disc pl-8'>
                    <li>Під час розіграшу випадковим чином (рандомно) обирається порядковий номер учасника з бази бота Vizok.</li>
                    <li>Організатори телефонують на перший (не другий) вказаний номер у профілі учасника.</li>
                    <li>Якщо учасник відповідає протягом шести гудків, він отримує право вибрати один із п’ятнадцяти конвертів.</li>
                    <li>Якщо учасник не відповів протягом шести гудків, шанс переходить до наступного випадково обраного учасника.</li>
                    <li>Загалом організатори виконують лише 4 телефонні розмови.</li>
                    <li>Якщо протягом 4-х діалогів не буде виграно генеральний та додаткові призи, тоді вони переходять на наступний розіграш.</li>
                    <li>Після 4-х результативних дзвінків організатори відкривають всі конверти та демонструють під якими номерами знаходились призи.</li>
                    </ul>
                </li>
                <li>
                    <span className='font-semibold'>Обмеження:</span>
                    <ul className='list-disc pl-8'>
                    <li>Один учасник може отримати лише один приз протягом місяця.</li>
                    <li>Призи не підлягають обміну чи заміні на грошовий еквівалент.</li>
                    </ul>
                </li>
                <li>
                    <span className='font-semibold'>Онлайн-трансляція:</span>
                    <ul className='list-disc pl-8'>
                    <li>Розіграш відбувається в прямому ефірі, щоб забезпечити прозорість процесу.</li>
                    <li>Посилання на трансляцію буде заздалегідь опубліковане в розсилці бота Vizok.</li>
                    <li>Запис розіграшу зберігається і буде доступний на нашому сайті та в соціальних мережах.</li>
                    </ul>
                </li>
                <li>
                    <span className='font-semibold'>Оголошення результатів:</span> Імена переможців та їхні призи будуть повідомлені через розсилку бота Vizok та на сайті www.vizok.info після завершення розіграшу.
                </li>
                </ol>
                <h4 className='text-xl font-semibold mt-6'>Наразі версії призів такі:</h4>
                <ul className='list-disc pl-8'>
                <li>Генеральний приз - смартфон;</li>
                <li>Додатк. призи - навушники - 3 шт.;</li>
                <li>Символічний сувенір (магнітик) - 11 шт.</li>
                </ul>
            </div>
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
                                alt={work.alt}
                                className='w-full h-96 object-cover'
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
                            className='bg-white rounded-lg p-8 max-w-full w-11/12 max-h-[80vh] relative overflow-auto'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeWork}
                                className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl'
                            >
                                &times;
                            </button>
                            <img
                                src={selectedWork.image}
                                alt={selectedWork.alt}
                                className='w-full h-auto max-h-[80vh] object-contain rounded-lg mb-4'
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
