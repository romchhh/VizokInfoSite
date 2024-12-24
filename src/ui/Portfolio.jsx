import React, { useState } from 'react';

function Portfolio() {
    const [selectedWork, setSelectedWork] = useState(null);

    const works = [
        {
            title: "Розіграш 20.12.2024",
            description: `
                <p>20 грудня 2024 року відбувся розіграш призів серед клієнтів <strong>Vizok.info</strong>. 
                Ми щиро дякуємо усім учасникам за активність та довіру до нашого сервісу!</p>
                <p><strong>Імена переможців:</strong></p>
                <ul>
                    <li><strong>Генеральний приз</strong> - смартфон: Іван Петренко</li>
                    <li><strong>Додаткові призи</strong> - навушники:
                        <ul>
                            <li>Марія Коваленко</li>
                            <li>Сергій Лисенко</li>
                            <li>Олена Ткаченко</li>
                        </ul>
                    </li>
                    <li><strong>Символічні сувеніри:</strong>
                        <ul>
                            <li>Андрій Василенко</li>
                            <li>Оксана Гуменюк</li>
                            <li>та інші</li>
                        </ul>
                    </li>
                </ul>
                <p><strong>Запис розіграшу:</strong> <a href="https://example.com/record" target="_blank" rel="noopener noreferrer" class="text-blue-500 font-semibold underline">Переглянути відео</a></p>
                <p>Не пропустіть наступний розіграш! Скористайтеся послугами <strong>Vizok.info</strong>, щоб взяти участь.</p>
            `,
            image: 'giveaway2024.png',
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
                    <h3 className='text-2xl font-semibold mb-4'>Умови участі</h3>
                    <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                        <p className='text-lg mb-4'>
                            Щоб взяти участь у щомісячному розіграші призів від <strong>Vizok.info</strong>, виконайте наступні умови:
                        </p>
                        <ul className='list-decimal pl-8 space-y-3'>
                            <li>
                                <span className='font-semibold'>Використовуйте телеграм-бот Vizok</span> для замовлення 
                                перевезень або участі в організації.
                            </li>
                            <li>
                                <span className='font-semibold'>Підтверджуйте свою участь</span> у розіграші за допомогою спеціального повідомлення.
                            </li>
                            <li>
                                <span className='font-semibold'>Очікуйте оголошення переможців</span> у прямому ефірі 
                                через наш офіційний Telegram-канал.
                            </li>
                            <li>
                                Дотримуйтесь правил та не порушуйте загальних умов використання сервісу.
                            </li>
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
