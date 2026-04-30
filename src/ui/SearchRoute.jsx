import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { telegramWebApp, closeTelegramWebApp, setupMainButton } from '../utils/telegramWebApp';
import './SearchRoute.css';

function SearchRoute() {
    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');
    const [startSuggestions, setStartSuggestions] = useState([]);
    const [endSuggestions, setEndSuggestions] = useState([]);
    const [showStartSuggestions, setShowStartSuggestions] = useState(false);
    const [showEndSuggestions, setShowEndSuggestions] = useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [activeSuggestionsContainer, setActiveSuggestionsContainer] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    
    const searchTimeout = useRef(null);
    const startSuggestionsRef = useRef(null);
    const endSuggestionsRef = useRef(null);
    const searchCache = useRef(new Map()); // Кеш для API запитів
    const location = useLocation();

    // Отримуємо параметри з URL
    const urlParams = new URLSearchParams(location.search);
    const userId = urlParams.get('user_id') || 'unknown';
    const userLang = urlParams.get('lang') || 'uk';
    
    // Використовуємо проксі для вебхуків (обходимо Mixed Content)
    const currentOrigin = window.location.origin;
    const isProduction = currentOrigin.includes('vizok.info');
    
    // Використовуємо ngrok HTTPS тунель для продакшн
    const defaultWebhookUrl = isProduction 
        ? 'https://88c66447ddba.ngrok-free.app/search_webhook'
        : `${currentOrigin}/api/search-webhook-proxy`;
    
    // Якщо webhook_url HTTP, то використовуємо ngrok HTTPS тунель
    let webhookUrl = urlParams.get('webhook_url') || defaultWebhookUrl;
    if (webhookUrl.startsWith('http://')) {
        console.log('Converting HTTP webhook to ngrok HTTPS:', webhookUrl);
        if (webhookUrl.includes('139.59.208.152:8001')) {
            webhookUrl = 'https://88c66447ddba.ngrok-free.app/search_webhook';
        } else {
            webhookUrl = defaultWebhookUrl;
        }
    }

    // Переклади для всіх підтримуваних мов
    const translations = {
        uk: {
            title: '🔍 Пошук поїздки',
            subtitle: 'Оберіть початкову та кінцеву точки вашої поїздки',
            from_label: '📍 Звідки',
            to_label: '🎯 Куди',
            from_placeholder: 'Введіть місто відправлення',
            to_placeholder: 'Введіть місто призначення',
            swap_title: 'Поміняти місцями',
            search_button: '🔍 Почати пошук',
            examples_title: '💡 Приклади маршрутів:',
            examples_text: '• Київ → Варшава\n• Львів → Краків\n• Одеса → Бухарест\n• Харків → Братислава',
            processing: 'Обробляємо ваш запит...',
            processing_button: 'Обробляємо...',
            error_fill_both: 'Будь ласка, заповніть обидва поля',
            error_same_cities: 'Початкове та кінцеве місто не можуть бути однаковими',
            error_too_short: 'Назва міста повинна містити мінімум 2 символи',
            error_too_long: 'Назва міста занадто довга (максимум 50 символів)',
            success_message: '✅ Пошук надіслано! Маршрут: {start} → {end}',
            success_alert: 'Запит на пошук надіслано! Очікуйте результати в боті.',
            return_to_bot: 'Повернутися в бот',
            error_prefix: '❌ Помилка: '
        },
        en: {
            title: '🔍 Trip Search',
            subtitle: 'Select your trip start and end points',
            from_label: '📍 From',
            to_label: '🎯 To',
            from_placeholder: 'Enter departure city',
            to_placeholder: 'Enter destination city',
            swap_title: 'Swap places',
            search_button: '🔍 Start Search',
            examples_title: '💡 Route Examples:',
            examples_text: '• Kyiv → Warsaw\n• Lviv → Krakow\n• Odesa → Bucharest\n• Kharkiv → Bratislava',
            processing: 'Processing your request...',
            processing_button: 'Processing...',
            error_fill_both: 'Please fill in both fields',
            error_same_cities: 'Start and end cities cannot be the same',
            error_too_short: 'City name must contain at least 2 characters',
            error_too_long: 'City name is too long (maximum 50 characters)',
            success_message: '✅ Search sent! Route: {start} → {end}',
            success_alert: 'Search request sent! Await results in the bot.',
            return_to_bot: 'Return to Bot',
            error_prefix: '❌ Error: '
        },
        pl: {
            title: '🔍 Wyszukiwanie podróży',
            subtitle: 'Wybierz punkt początkowy i końcowy podróży',
            from_label: '📍 Skąd',
            to_label: '🎯 Dokąd',
            from_placeholder: 'Wprowadź miasto wyjazdu',
            to_placeholder: 'Wprowadź miasto docelowe',
            swap_title: 'Zamień miejscami',
            search_button: '🔍 Rozpocznij wyszukiwanie',
            examples_title: '💡 Przykłady tras:',
            examples_text: '• Kijów → Warszawa\n• Lwów → Kraków\n• Odessa → Bukareszt\n• Charków → Bratysława',
            processing: 'Przetwarzanie żądania...',
            processing_button: 'Przetwarzanie...',
            error_fill_both: 'Wypełnij oba pola',
            error_same_cities: 'Miasto początkowe i końcowe nie mogą być takie same',
            error_too_short: 'Nazwa miasta musi zawierać co najmniej 2 znaki',
            error_too_long: 'Nazwa miasta jest za długa (maksymalnie 50 znaków)',
            success_message: '✅ Wyszukiwanie wysłane! Trasa: {start} → {end}',
            success_alert: 'Żądanie wyszukiwania wysłane! Oczekuj wyników w bocie.',
            return_to_bot: 'Powrót do bota',
            error_prefix: '❌ Błąd: '
        },
        de: {
            title: '🔍 Reisesuche',
            subtitle: 'Wählen Sie Start- und Endpunkt Ihrer Reise',
            from_label: '📍 Von',
            to_label: '🎯 Nach',
            from_placeholder: 'Abfahrtsstadt eingeben',
            to_placeholder: 'Zielstadt eingeben',
            swap_title: 'Plätze tauschen',
            search_button: '🔍 Suche starten',
            examples_title: '💡 Routenbeispiele:',
            examples_text: '• Kiew → Warschau\n• Lwiw → Krakau\n• Odessa → Bukarest\n• Charkiw → Bratislava',
            processing: 'Anfrage wird bearbeitet...',
            processing_button: 'Bearbeitung...',
            error_fill_both: 'Bitte füllen Sie beide Felder aus',
            error_same_cities: 'Start- und Zielstadt können nicht gleich sein',
            error_too_short: 'Stadtname muss mindestens 2 Zeichen enthalten',
            error_too_long: 'Stadtname ist zu lang (maximal 50 Zeichen)',
            success_message: '✅ Suche gesendet! Route: {start} → {end}',
            success_alert: 'Suchanfrage gesendet! Erwarten Sie Ergebnisse im Bot.',
            return_to_bot: 'Zurück zum Bot',
            error_prefix: '❌ Fehler: '
        }
    };

    const t = translations[userLang] || translations.uk;

    // Пошук міст через API з кешуванням
    const searchCities = async (query) => {
        if (query.length < 2) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        
        // Перевіряємо кеш
        if (searchCache.current.has(normalizedQuery)) {
            console.log('Використовуємо кешований результат для:', normalizedQuery);
            return searchCache.current.get(normalizedQuery);
        }
        
        try {
            // Спочатку пробуємо OpenStreetMap Nominatim API
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=15&addressdetails=1&accept-language=${userLang}&countrycodes=ua,pl,de,cz,sk,hu,ro,at,by,md,lt,lv,ee,fr,it,es,nl,be,ch,bg`;
            
            console.log('API запит для:', query);
            
            const response = await fetch(nominatimUrl, {
                headers: {
                    'User-Agent': 'VizokBot/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.length > 0) {
                const cities = data
                    .filter(item => {
                        // Фільтруємо тільки міста, села, містечка
                        const validTypes = ['city', 'town', 'village', 'hamlet', 'municipality'];
                        const validClasses = ['place', 'boundary'];
                        return validTypes.includes(item.type) || validClasses.includes(item.class);
                    })
                    .map(city => {
                        const nameParts = city.display_name.split(',');
                        const cityName = nameParts[0].trim();
                        const country = city.address?.country || nameParts[nameParts.length - 1].trim();
                        
                        return {
                            name: cityName,
                            country: country,
                            fullName: city.display_name,
                            importance: city.importance || 0
                        };
                    })
                    // Сортуємо за важливістю
                    .sort((a, b) => (b.importance || 0) - (a.importance || 0))
                    .slice(0, 10);
                
                // Якщо є результати з API, кешуємо їх та повертаємо
                if (cities.length > 0) {
                    searchCache.current.set(normalizedQuery, cities);
                    console.log('Знайдено міст через API:', cities.length);
                    return cities;
                }
            }
            
            // Якщо API не дав результатів, використовуємо популярні міста
            const fallbackCities = getPopularCities(query);
            searchCache.current.set(normalizedQuery, fallbackCities);
            console.log('Використовуємо fallback міста:', fallbackCities.length);
            return fallbackCities;
            
        } catch (error) {
            console.error('Помилка пошуку міст через API:', error);
            
            // Fallback до популярних міст при помилці API
            const fallbackCities = getPopularCities(query);
            searchCache.current.set(normalizedQuery, fallbackCities);
            return fallbackCities;
        }
    };

    // Функція для пошуку серед популярних міст (fallback)
    const getPopularCities = (query) => {
        const popularCities = [
            // Україна
            { name: 'Київ', country: 'Україна' },
            { name: 'Львів', country: 'Україна' },
            { name: 'Одеса', country: 'Україна' },
            { name: 'Харків', country: 'Україна' },
            { name: 'Дніпро', country: 'Україна' },
            { name: 'Запоріжжя', country: 'Україна' },
            { name: 'Кривий Ріг', country: 'Україна' },
            { name: 'Миколаїв', country: 'Україна' },
            { name: 'Вінниця', country: 'Україна' },
            { name: 'Херсон', country: 'Україна' },
            { name: 'Полтава', country: 'Україна' },
            { name: 'Чернігів', country: 'Україна' },
            { name: 'Черкаси', country: 'Україна' },
            { name: 'Житомир', country: 'Україна' },
            { name: 'Суми', country: 'Україна' },
            { name: 'Хмельницький', country: 'Україна' },
            { name: 'Чернівці', country: 'Україна' },
            { name: 'Рівне', country: 'Україна' },
            { name: 'Кропивницький', country: 'Україна' },
            { name: 'Івано-Франківськ', country: 'Україна' },
            { name: 'Кременчук', country: 'Україна' },
            { name: 'Тернопіль', country: 'Україна' },
            { name: 'Луцьк', country: 'Україна' },
            { name: 'Біла Церква', country: 'Україна' },
            { name: 'Ковель', country: 'Україна' },
            { name: 'Ужгород', country: 'Україна' },
            
            // Польща
            { name: 'Варшава', country: 'Польща' },
            { name: 'Краків', country: 'Польща' },
            { name: 'Гданськ', country: 'Польща' },
            { name: 'Вроцлав', country: 'Польща' },
            { name: 'Познань', country: 'Польща' },
            { name: 'Лодзь', country: 'Польща' },
            { name: 'Катовіце', country: 'Польща' },
            { name: 'Бидгощ', country: 'Польща' },
            { name: 'Люблін', country: 'Польща' },
            { name: 'Білосток', country: 'Польща' },
            { name: 'Щецин', country: 'Польща' },
            { name: 'Жешув', country: 'Польща' },
            { name: 'Ольштин', country: 'Польща' },
            { name: 'Кельце', country: 'Польща' },
            
            // Німеччина
            { name: 'Берлін', country: 'Німеччина' },
            { name: 'Мюнхен', country: 'Німеччина' },
            { name: 'Гамбург', country: 'Німеччина' },
            { name: 'Кельн', country: 'Німеччина' },
            { name: 'Франкфурт', country: 'Німеччина' },
            { name: 'Дюссельдорф', country: 'Німеччина' },
            { name: 'Дортмунд', country: 'Німеччина' },
            { name: 'Ессен', country: 'Німеччина' },
            { name: 'Лейпциг', country: 'Німеччина' },
            { name: 'Бремен', country: 'Німеччина' },
            { name: 'Дрезден', country: 'Німеччина' },
            { name: 'Ганновер', country: 'Німеччина' },
            { name: 'Нюрнберг', country: 'Німеччина' },
            { name: 'Штутгарт', country: 'Німеччина' },
            
            // Чехія
            { name: 'Прага', country: 'Чехія' },
            { name: 'Брно', country: 'Чехія' },
            { name: 'Острава', country: 'Чехія' },
            { name: 'Пльзень', country: 'Чехія' },
            { name: 'Ческе-Будейовіце', country: 'Чехія' },
            { name: 'Оломоуц', country: 'Чехія' },
            
            // Угорщина
            { name: 'Будапешт', country: 'Угорщина' },
            { name: 'Дебрецен', country: 'Угорщина' },
            { name: 'Сегед', country: 'Угорщина' },
            { name: 'Мішкольц', country: 'Угорщина' },
            { name: 'Печ', country: 'Угорщина' },
            { name: 'Дьєр', country: 'Угорщина' },
            
            // Румунія
            { name: 'Бухарест', country: 'Румунія' },
            { name: 'Клуж-Напока', country: 'Румунія' },
            { name: 'Тімішоара', country: 'Румунія' },
            { name: 'Яси', country: 'Румунія' },
            { name: 'Констанца', country: 'Румунія' },
            { name: 'Крайова', country: 'Румунія' },
            { name: 'Брашов', country: 'Румунія' },
            { name: 'Галац', country: 'Румунія' },
            
            // Словаччина
            { name: 'Братислава', country: 'Словаччина' },
            { name: 'Кошице', country: 'Словаччина' },
            { name: 'Пряшів', country: 'Словаччина' },
            { name: 'Жиліна', country: 'Словаччина' },
            
            // Болгарія
            { name: 'Софія', country: 'Болгарія' },
            { name: 'Пловдив', country: 'Болгарія' },
            { name: 'Варна', country: 'Болгарія' },
            { name: 'Бургас', country: 'Болгарія' },
            { name: 'Русе', country: 'Болгарія' },
            { name: 'Стара Загора', country: 'Болгарія' },
            
            // Австрія
            { name: 'Відень', country: 'Австрія' },
            { name: 'Грац', country: 'Австрія' },
            { name: 'Лінц', country: 'Австрія' },
            { name: 'Зальцбург', country: 'Австрія' },
            { name: 'Інсбрук', country: 'Австрія' },
            
            // Білорусь
            { name: 'Мінськ', country: 'Білорусь' },
            { name: 'Гомель', country: 'Білорусь' },
            { name: 'Могильов', country: 'Білорусь' },
            { name: 'Вітебськ', country: 'Білорусь' },
            { name: 'Гродно', country: 'Білорусь' },
            { name: 'Брест', country: 'Білорусь' },
            
            // Молдова
            { name: 'Кишинів', country: 'Молдова' },
            { name: 'Тирасполь', country: 'Молдова' },
            { name: 'Бельці', country: 'Молдова' },
            
            // Литва
            { name: 'Вільнюс', country: 'Литва' },
            { name: 'Каунас', country: 'Литва' },
            { name: 'Клайпеда', country: 'Литва' },
            
            // Латвія
            { name: 'Рига', country: 'Латвія' },
            { name: 'Даугавпілс', country: 'Латвія' },
            { name: 'Лієпая', country: 'Латвія' },
            
            // Естонія
            { name: 'Таллінн', country: 'Естонія' },
            { name: 'Тарту', country: 'Естонія' },
            { name: 'Нарва', country: 'Естонія' },
            
            // Італія
            { name: 'Рим', country: 'Італія' },
            { name: 'Мілан', country: 'Італія' },
            { name: 'Неаполь', country: 'Італія' },
            { name: 'Турин', country: 'Італія' },
            { name: 'Палермо', country: 'Італія' },
            { name: 'Генуя', country: 'Італія' },
            { name: 'Болонья', country: 'Італія' },
            { name: 'Флоренція', country: 'Італія' },
            { name: 'Венеція', country: 'Італія' },
            
            // Франція
            { name: 'Париж', country: 'Франція' },
            { name: 'Марсель', country: 'Франція' },
            { name: 'Ліон', country: 'Франція' },
            { name: 'Тулуза', country: 'Франція' },
            { name: 'Ніцца', country: 'Франція' },
            { name: 'Нант', country: 'Франція' },
            { name: 'Страсбург', country: 'Франція' },
            { name: 'Монпельє', country: 'Франція' },
            
            // Іспанія
            { name: 'Мадрид', country: 'Іспанія' },
            { name: 'Барселона', country: 'Іспанія' },
            { name: 'Валенсія', country: 'Іспанія' },
            { name: 'Севілья', country: 'Іспанія' },
            { name: 'Сарагоса', country: 'Іспанія' },
            { name: 'Малага', country: 'Іспанія' },
            { name: 'Більбао', country: 'Іспанія' },
            
            // Нідерланди
            { name: 'Амстердам', country: 'Нідерланди' },
            { name: 'Роттердам', country: 'Нідерланди' },
            { name: 'Гаага', country: 'Нідерланди' },
            { name: 'Утрехт', country: 'Нідерланди' },
            { name: 'Ейндховен', country: 'Нідерланди' },
            
            // Бельгія
            { name: 'Брюссель', country: 'Бельгія' },
            { name: 'Антверпен', country: 'Бельгія' },
            { name: 'Гент', country: 'Бельгія' },
            { name: 'Шарлеруа', country: 'Бельгія' },
            { name: 'Льєж', country: 'Бельгія' },
            
            // Швейцарія
            { name: 'Цюрих', country: 'Швейцарія' },
            { name: 'Женева', country: 'Швейцарія' },
            { name: 'Базель', country: 'Швейцарія' },
            { name: 'Берн', country: 'Швейцарія' },
            { name: 'Лозанна', country: 'Швейцарія' }
        ];
        
        const lowerQuery = query.toLowerCase();
        return popularCities
            .filter(city => city.name.toLowerCase().includes(lowerQuery))
            .slice(0, 10);
    };

    // Обробка введення в поле пошуку
    const handleCityInput = async (value, isStartCity) => {
        if (isStartCity) {
            setStartCity(value);
        } else {
            setEndCity(value);
        }
        
        if (value.length < 2) {
            if (isStartCity) {
                setShowStartSuggestions(false);
            } else {
                setShowEndSuggestions(false);
            }
            return;
        }

        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(async () => {
            const suggestions = await searchCities(value);
            if (isStartCity) {
                setStartSuggestions(suggestions);
                setShowStartSuggestions(true);
                setActiveSuggestionsContainer('start');
            } else {
                setEndSuggestions(suggestions);
                setShowEndSuggestions(true);
                setActiveSuggestionsContainer('end');
            }
        }, 300);
    };

    // Вибір міста з підказок
    const selectCity = (city, isStartCity) => {
        if (isStartCity) {
            setStartCity(city.name);
            setShowStartSuggestions(false);
        } else {
            setEndCity(city.name);
            setShowEndSuggestions(false);
        }
        setSelectedSuggestionIndex(-1);
        setActiveSuggestionsContainer(null);
    };

    // Обмін міст місцями
    const swapCities = () => {
        const temp = startCity;
        setStartCity(endCity);
        setEndCity(temp);
    };

    // Валідація міст
    const validateCities = (startCity, endCity) => {
        if (!startCity.trim() || !endCity.trim()) {
            throw new Error(t.error_fill_both);
        }
        
        if (startCity.trim().toLowerCase() === endCity.trim().toLowerCase()) {
            throw new Error(t.error_same_cities);
        }
        
        if (startCity.length < 2 || endCity.length < 2) {
            throw new Error(t.error_too_short);
        }
        
        if (startCity.length > 50 || endCity.length > 50) {
            throw new Error(t.error_too_long);
        }
    };

    // Відправка форми
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            
            const startCityTrimmed = startCity.trim();
            const endCityTrimmed = endCity.trim();
            
            // Валідація
            validateCities(startCityTrimmed, endCityTrimmed);
            
            // Показуємо завантаження
            setIsSubmitting(true);
            
            // Підготовка даних
            const searchData = {
                user_id: userId.toString(),
                start_city: startCityTrimmed,
                end_city: endCityTrimmed,
                lang: userLang,
                timestamp: new Date().toISOString()
            };
            
            console.log('Відправляємо дані пошуку:', searchData);
            console.log('Webhook URL:', webhookUrl);
            
            // Відправка на webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Відповідь сервера:', result);
            
            setIsSuccess(true);
            
            // Автоматично закриваємо WebApp після успішного збереження
            setTimeout(() => {
                closeTelegramWebApp({
                    type: 'search_completed',
                    route: `${startCityTrimmed} → ${endCityTrimmed}`
                });
            }, 1500); // Затримка 1.5 секунди для показу повідомлення про успіх
            
        } catch (error) {
            console.error('Помилка відправки:', error);
            setError(t.error_prefix + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };



    // Обробка клавіш для навігації по підказках
    const handleKeyDown = (e, isStartCity) => {
        const suggestions = isStartCity ? startSuggestions : endSuggestions;
        const showSuggestions = isStartCity ? showStartSuggestions : showEndSuggestions;
        
        if (!showSuggestions || suggestions.length === 0) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex(prev => 
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
            e.preventDefault();
            selectCity(suggestions[selectedSuggestionIndex], isStartCity);
        } else if (e.key === 'Escape') {
            if (isStartCity) {
                setShowStartSuggestions(false);
            } else {
                setShowEndSuggestions(false);
            }
            setSelectedSuggestionIndex(-1);
        }
    };

    // Закриття підказок при кліку поза ними
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (startSuggestionsRef.current && !startSuggestionsRef.current.contains(event.target)) {
                setShowStartSuggestions(false);
            }
            if (endSuggestionsRef.current && !endSuggestionsRef.current.contains(event.target)) {
                setShowEndSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Ініціалізація Telegram WebApp
    useEffect(() => {
        // Ініціалізуємо WebApp
        telegramWebApp.init();
        
        // Налаштовуємо головну кнопку
        setupMainButton(t.search_button, () => {
            handleSubmit({ preventDefault: () => {} });
        });

        return () => {
            telegramWebApp.hideMainButton();
            // Очищуємо кеш при розмонтуванні компонента
            searchCache.current.clear();
        };
    }, [startCity, endCity, t.search_button]);

    if (isSuccess) {
        return (
            <div className="search-route-container">
                <div className="search-route-wrapper">
                    <div className="search-route-success">
                        <div className="search-route-success-icon">✅</div>
                        <h2 className="search-route-success-title">
                            {t.success_message.replace('{start}', startCity).replace('{end}', endCity)}
                        </h2>
                        <p style={{fontSize: '14px', color: 'var(--tg-theme-hint-color, #666)', marginBottom: '15px'}}>
                            {t.success_alert}
                        </p>
                        
                        <button 
                            onClick={() => {
                                closeTelegramWebApp({
                                    type: 'search_completed',
                                    route: `${startCity} → ${endCity}`
                                });
                            }}
                            className="search-route-return-btn"
                        >
                            {t.return_to_bot}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="search-route-container">
            <div className="search-route-wrapper">
                {/* Header */}
                <div className="search-route-header">
                    <h1>{t.title}</h1>
                    <p>{t.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="search-route-form">
                    {/* Початкове місто */}
                    <div className="search-route-form-group">
                        <label htmlFor="startCity">{t.from_label}</label>
                        <div className="search-route-city-input-container" ref={startSuggestionsRef}>
                            <div className="search-route-input-group">
                                <span className="search-route-input-icon">🚩</span>
                                <input
                                    type="text"
                                    id="startCity"
                                    value={startCity}
                                    onChange={(e) => handleCityInput(e.target.value, true)}
                                    onKeyDown={(e) => handleKeyDown(e, true)}
                                    placeholder={t.from_placeholder}
                                    className="search-route-city-input with-icon"
                                    autoComplete="off"
                                />
                            </div>
                            {showStartSuggestions && (
                                <div className="search-route-city-suggestions">
                                    {startSuggestions.map((city, index) => (
                                        <div
                                            key={index}
                                            onClick={() => selectCity(city, true)}
                                            className={`search-route-suggestion-item ${
                                                index === selectedSuggestionIndex ? 'selected' : ''
                                            }`}
                                        >
                                            <div className="search-route-suggestion-city">{city.name}</div>
                                            <div className="search-route-suggestion-country">{city.country}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Кнопка обміну */}
                    <div className="search-route-arrow-container">
                        <button 
                            type="button" 
                            className="search-route-swap-btn" 
                            onClick={swapCities}
                            title={t.swap_title}
                        >
                            ⇅
                        </button>
                    </div>

                    {/* Кінцеве місто */}
                    <div className="search-route-form-group">
                        <label htmlFor="endCity">{t.to_label}</label>
                        <div className="search-route-city-input-container" ref={endSuggestionsRef}>
                            <div className="search-route-input-group">
                                <span className="search-route-input-icon">🏁</span>
                                <input
                                    type="text"
                                    id="endCity"
                                    value={endCity}
                                    onChange={(e) => handleCityInput(e.target.value, false)}
                                    onKeyDown={(e) => handleKeyDown(e, false)}
                                    placeholder={t.to_placeholder}
                                    className="search-route-city-input with-icon"
                                    autoComplete="off"
                                />
                            </div>
                            {showEndSuggestions && (
                                <div className="search-route-city-suggestions">
                                    {endSuggestions.map((city, index) => (
                                        <div
                                            key={index}
                                            onClick={() => selectCity(city, false)}
                                            className={`search-route-suggestion-item ${
                                                index === selectedSuggestionIndex ? 'selected' : ''
                                            }`}
                                        >
                                            <div className="search-route-suggestion-city">{city.name}</div>
                                            <div className="search-route-suggestion-country">{city.country}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Кнопка пошуку */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="search-route-submit-btn"
                    >
                        {isSubmitting ? t.processing_button : t.search_button}
                    </button>



                    {/* Помилка */}
                    {error && (
                        <div className="search-route-error">
                            {error}
                        </div>
                    )}

                    {/* Приклади */}
                    <div className="search-route-example">
                        <h3>{t.examples_title}</h3>
                        <p>{t.examples_text.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < t.examples_text.split('\n').length - 1 && <br />}
                            </span>
                        ))}</p>
                    </div>
                </form>

                {/* Завантаження */}
                {isSubmitting && (
                    <div className="search-route-loading">
                        <div className="search-route-loading-spinner"></div>
                        <p>{t.processing}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchRoute;