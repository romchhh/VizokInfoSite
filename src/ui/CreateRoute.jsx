import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { telegramWebApp, closeTelegramWebApp } from '../utils/telegramWebApp';
import './CreateRoute.css';

function CreateRoute() {
    const [stops, setStops] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [showAddInput, setShowAddInput] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const searchTimeout = useRef(null);
    const suggestionsRef = useRef(null);
    const searchCache = useRef(new Map()); // Кеш для API запитів
    const location = useLocation();

    // Отримуємо параметри з URL
    const urlParams = new URLSearchParams(location.search);
    const userId = urlParams.get('user_id') || 'unknown';
    const userLang = urlParams.get('lang') || 'uk';
    const actionType = urlParams.get('create') || 'trip';
    const action = urlParams.get('action') || 'create';
    // Використовуємо проксі для вебхуків (обходимо Mixed Content)
    const currentOrigin = window.location.origin;
    const isProduction = currentOrigin.includes('vizok.info');
    
    // Використовуємо ngrok HTTPS тунель для продакшн
    const defaultWebhookUrl = isProduction 
        ? 'https://88c66447ddba.ngrok-free.app/webhook'
        : `${currentOrigin}/api/webhook-proxy`;
    
    // Якщо webhook_url HTTP, то використовуємо ngrok HTTPS тунель
    let webhookUrl = urlParams.get('webhook_url') || defaultWebhookUrl;
    if (webhookUrl.startsWith('http://')) {
        console.log('Converting HTTP webhook to ngrok HTTPS:', webhookUrl);
        // Замінюємо HTTP на ngrok HTTPS тунель
        if (webhookUrl.includes('139.59.208.152:8001')) {
            webhookUrl = 'https://88c66447ddba.ngrok-free.app/webhook';
        } else {
            webhookUrl = defaultWebhookUrl;
        }
    }

    // Переклади для всіх підтримуваних мов
    const translations = {
        uk: {
            pageTitle: action === 'edit' ? '✏️ Редагування маршруту' : '🗺️ Маршрут поїздки',
            pageDescription: action === 'edit' ? 'Змініть міста вашого маршруту' : 'Додайте міста вашого маршруту в правильному порядку',
            addStopLabel: 'Додати зупинку:',
            addStopBtn: '➕ Додати зупинку',
            cityPlaceholder: 'Почніть вводити назву міста...',
            stopsCount: 'Зупинок',
            errorMessage: 'Будь ласка, додайте принаймні 2 зупинки',
            exampleTitle: '💡 Приклад маршруту:',
            exampleText: 'Київ → Житомир → Рівне → Львів',
            confirmBtn: action === 'edit' ? '✅ Зберегти зміни' : '✅ Підтвердити маршрут',
            successMessage: action === 'edit' ? '✅ Маршрут успішно змінено!' : '✅ Маршрут успішно збережено!',
            errorSaving: 'Помилка при збереженні маршруту. Спробуйте ще раз.',
            returnToBot: 'Повернутися в бота',
            addManually: '➕ Додати "{query}" вручну',
            addManuallyDesc: 'Натисніть, щоб додати це місто до маршруту',
            ownCity: 'Власне місто',
            unknownCountry: 'Невідома країна',
            routeSaved: 'Маршрут успішно збережено! Можете закрити цю сторінку.'
        },
        pl: {
            pageTitle: action === 'edit' ? '✏️ Edycja trasy' : '🗺️ Trasa podróży',
            pageDescription: action === 'edit' ? 'Zmień miasta swojej trasy' : 'Dodaj miasta do swojej trasy we właściwej kolejności',
            addStopLabel: 'Dodaj przystanek:',
            addStopBtn: '➕ Dodaj przystanek',
            cityPlaceholder: 'Zacznij wpisywać nazwę miasta...',
            stopsCount: 'Przystanków',
            errorMessage: 'Proszę dodać co najmniej 2 przystanki',
            exampleTitle: '💡 Przykład trasy:',
            exampleText: 'Warszawa → Kraków → Wrocław → Gdańsk',
            confirmBtn: action === 'edit' ? '✅ Zapisz zmiany' : '✅ Potwierdź trasę',
            successMessage: action === 'edit' ? '✅ Trasa została pomyślnie zmieniona!' : '✅ Trasa została pomyślnie zapisana!',
            errorSaving: 'Błąd podczas zapisywania trasy. Spróbuj ponownie.',
            returnToBot: 'Powrót do bota',
            addManually: '➕ Dodaj "{query}" ręcznie',
            addManuallyDesc: 'Kliknij, aby dodać to miasto do trasy',
            ownCity: 'Własne miasto',
            unknownCountry: 'Nieznany kraj',
            autoClosing: 'Automatycznie zamyka się za 2 sekundy...',
            closeApp: 'Zamknij aplikację'
        },
        en: {
            pageTitle: action === 'edit' ? '✏️ Edit Route' : '🗺️ Trip Route',
            pageDescription: action === 'edit' ? 'Change cities in your route' : 'Add cities to your route in the correct order',
            addStopLabel: 'Add stop:',
            addStopBtn: '➕ Add stop',
            cityPlaceholder: 'Start typing city name...',
            stopsCount: 'Stops',
            errorMessage: 'Please add at least 2 stops',
            exampleTitle: '💡 Route example:',
            exampleText: 'London → Manchester → Liverpool → Edinburgh',
            confirmBtn: action === 'edit' ? '✅ Save changes' : '✅ Confirm route',
            successMessage: action === 'edit' ? '✅ Route successfully changed!' : '✅ Route saved successfully!',
            errorSaving: 'Error saving route. Please try again.',
            returnToBot: 'Return to bot',
            addManually: '➕ Add "{query}" manually',
            addManuallyDesc: 'Click to add this city to the route',
            ownCity: 'Custom city',
            unknownCountry: 'Unknown country',
            autoClosing: 'Automatically closing in 2 seconds...'
        },
        de: {
            pageTitle: action === 'edit' ? '✏️ Route bearbeiten' : '🗺️ Reiseroute',
            pageDescription: action === 'edit' ? 'Ändern Sie die Städte Ihrer Route' : 'Fügen Sie Städte zu Ihrer Route in der richtigen Reihenfolge hinzu',
            addStopLabel: 'Stopp hinzufügen:',
            addStopBtn: '➕ Stopp hinzufügen',
            cityPlaceholder: 'Beginnen Sie mit der Eingabe des Stadtnamens...',
            stopsCount: 'Stopps',
            errorMessage: 'Bitte fügen Sie mindestens 2 Stopps hinzu',
            exampleTitle: '💡 Routenbeispiel:',
            exampleText: 'Berlin → Hamburg → München → Köln',
            confirmBtn: action === 'edit' ? '✅ Änderungen speichern' : '✅ Route bestätigen',
            successMessage: action === 'edit' ? '✅ Route erfolgreich geändert!' : '✅ Route erfolgreich gespeichert!',
            errorSaving: 'Fehler beim Speichern der Route. Bitte versuchen Sie es erneut.',
            returnToBot: 'Zurück zum Bot',
            addManually: '➕ "{query}" manuell hinzufügen',
            addManuallyDesc: 'Klicken Sie, um diese Stadt zur Route hinzuzufügen',
            ownCity: 'Eigene Stadt',
            unknownCountry: 'Unbekanntes Land'
        },
        cs: {
            pageTitle: action === 'edit' ? '✏️ Upravit trasu' : '🗺️ Trasa cesty',
            pageDescription: action === 'edit' ? 'Změňte města své trasy' : 'Přidejte města do své trasy ve správném pořadí',
            addStopLabel: 'Přidat zastávku:',
            addStopBtn: '➕ Přidat zastávku',
            cityPlaceholder: 'Začněte psát název města...',
            stopsCount: 'Zastávek',
            errorMessage: 'Prosím přidejte alespoň 2 zastávky',
            exampleTitle: '💡 Příklad trasy:',
            exampleText: 'Praha → Brno → Ostrava → Plzeň',
            confirmBtn: action === 'edit' ? '✅ Uložit změny' : '✅ Potvrdit trasu',
            successMessage: action === 'edit' ? '✅ Trasa byla úspěšně změněna!' : '✅ Trasa byla úspěšně uložena!',
            errorSaving: 'Chyba při ukládání trasy. Zkuste to znovu.',
            returnToBot: 'Návrat k botovi',
            addManually: '➕ Přidat "{query}" ručně',
            addManuallyDesc: 'Klikněte pro přidání tohoto města do trasy',
            ownCity: 'Vlastní město',
            unknownCountry: 'Neznámá země'
        },
        bg: {
            pageTitle: action === 'edit' ? '✏️ Редактиране на маршрут' : '🗺️ Маршрут на пътуването',
            pageDescription: action === 'edit' ? 'Променете градовете в маршрута си' : 'Добавете градове към вашия маршрут в правилния ред',
            addStopLabel: 'Добави спирка:',
            addStopBtn: '➕ Добави спирка',
            cityPlaceholder: 'Започнете да въвеждате име на град...',
            stopsCount: 'Спирки',
            errorMessage: 'Моля, добавете поне 2 спирки',
            exampleTitle: '💡 Пример за маршрут:',
            exampleText: 'София → Пловдив → Варна → Бургас',
            confirmBtn: action === 'edit' ? '✅ Запази промените' : '✅ Потвърди маршрута',
            successMessage: action === 'edit' ? '✅ Маршрутът е променен успешно!' : '✅ Маршрутът е запазен успешно!',
            errorSaving: 'Грешка при запазването на маршрута. Опитайте отново.',
            returnToBot: 'Връщане към бота',
            addManually: '➕ Добави "{query}" ръчно',
            addManuallyDesc: 'Кликнете, за да добавите този град към маршрута',
            ownCity: 'Собствен град',
            unknownCountry: 'Неизвестна страна'
        },
        ro: {
            pageTitle: action === 'edit' ? '✏️ Editare rută' : '🗺️ Ruta călătoriei',
            pageDescription: action === 'edit' ? 'Schimbați orașele din ruta dvs.' : 'Adăugați orașe la ruta dvs. în ordinea corectă',
            addStopLabel: 'Adaugă oprire:',
            addStopBtn: '➕ Adaugă oprire',
            cityPlaceholder: 'Începeți să tastați numele orașului...',
            stopsCount: 'Opriri',
            errorMessage: 'Vă rugăm să adăugați cel puțin 2 opriri',
            exampleTitle: '💡 Exemplu de rută:',
            exampleText: 'București → Cluj-Napoca → Timișoara → Constanța',
            confirmBtn: action === 'edit' ? '✅ Salvează modificările' : '✅ Confirmă ruta',
            successMessage: action === 'edit' ? '✅ Ruta a fost modificată cu succes!' : '✅ Ruta a fost salvată cu succes!',
            errorSaving: 'Eroare la salvarea rutei. Încercați din nou.',
            returnToBot: 'Întoarcere la bot',
            addManually: '➕ Adaugă "{query}" manual',
            addManuallyDesc: 'Faceți clic pentru a adăuga acest oraș la rută',
            ownCity: 'Oraș propriu',
            unknownCountry: 'Țară necunoscută'
        },
        hu: {
            pageTitle: action === 'edit' ? '✏️ Útvonal szerkesztése' : '🗺️ Utazási útvonal',
            pageDescription: action === 'edit' ? 'Változtassa meg az útvonal városait' : 'Adja hozzá a városokat az útvonalához a helyes sorrendben',
            addStopLabel: 'Megálló hozzáadása:',
            addStopBtn: '➕ Megálló hozzáadása',
            cityPlaceholder: 'Kezdje el beírni a város nevét...',
            stopsCount: 'Megállók',
            errorMessage: 'Kérjük, adjon hozzá legalább 2 megállót',
            exampleTitle: '💡 Útvonal példa:',
            exampleText: 'Budapest → Debrecen → Szeged → Pécs',
            confirmBtn: action === 'edit' ? '✅ Változások mentése' : '✅ Útvonal megerősítése',
            successMessage: action === 'edit' ? '✅ Az útvonal sikeresen megváltoztatva!' : '✅ Az útvonal sikeresen elmentve!',
            errorSaving: 'Hiba az útvonal mentésekor. Próbálja újra.',
            returnToBot: 'Visszatérés a bothoz',
            addManually: '➕ "{query}" manuális hozzáadása',
            addManuallyDesc: 'Kattintson a város útvonalhoz adásához',
            ownCity: 'Saját város',
            unknownCountry: 'Ismeretlen ország'
        },
        it: {
            pageTitle: action === 'edit' ? '✏️ Modifica percorso' : '🗺️ Percorso di viaggio',
            pageDescription: action === 'edit' ? 'Cambia le città del tuo percorso' : 'Aggiungi le città al tuo percorso nell\'ordine corretto',
            addStopLabel: 'Aggiungi fermata:',
            addStopBtn: '➕ Aggiungi fermata',
            cityPlaceholder: 'Inizia a digitare il nome della città...',
            stopsCount: 'Fermate',
            errorMessage: 'Si prega di aggiungere almeno 2 fermate',
            exampleTitle: '💡 Esempio di percorso:',
            exampleText: 'Roma → Milano → Napoli → Firenze',
            confirmBtn: action === 'edit' ? '✅ Salva modifiche' : '✅ Conferma percorso',
            successMessage: action === 'edit' ? '✅ Percorso modificato con successo!' : '✅ Percorso salvato con successo!',
            errorSaving: 'Errore nel salvare il percorso. Riprova.',
            returnToBot: 'Torna al bot',
            addManually: '➕ Aggiungi "{query}" manualmente',
            addManuallyDesc: 'Clicca per aggiungere questa città al percorso',
            ownCity: 'Città personalizzata',
            unknownCountry: 'Paese sconosciuto'
        },
        es: {
            pageTitle: action === 'edit' ? '✏️ Editar ruta' : '🗺️ Ruta de viaje',
            pageDescription: action === 'edit' ? 'Cambia las ciudades de tu ruta' : 'Añade ciudades a tu ruta en el orden correcto',
            addStopLabel: 'Añadir parada:',
            addStopBtn: '➕ Añadir parada',
            cityPlaceholder: 'Empieza a escribir el nombre de la ciudad...',
            stopsCount: 'Paradas',
            errorMessage: 'Por favor, añade al menos 2 paradas',
            exampleTitle: '💡 Ejemplo de ruta:',
            exampleText: 'Madrid → Barcelona → Valencia → Sevilla',
            confirmBtn: action === 'edit' ? '✅ Guardar cambios' : '✅ Confirmar ruta',
            successMessage: action === 'edit' ? '✅ ¡Ruta cambiada exitosamente!' : '✅ ¡Ruta guardada exitosamente!',
            errorSaving: 'Error al guardar la ruta. Inténtalo de nuevo.',
            returnToBot: 'Volver al bot',
            addManually: '➕ Añadir "{query}" manualmente',
            addManuallyDesc: 'Haz clic para añadir esta ciudad a la ruta',
            ownCity: 'Ciudad personalizada',
            unknownCountry: 'País desconocido'
        },
        ru: {
            pageTitle: action === 'edit' ? '✏️ Редактирование маршрута' : '🗺️ Маршрут поездки',
            pageDescription: action === 'edit' ? 'Измените города вашего маршрута' : 'Добавьте города вашего маршрута в правильном порядке',
            addStopLabel: 'Добавить остановку:',
            addStopBtn: '➕ Добавить остановку',
            cityPlaceholder: 'Начните вводить название города...',
            stopsCount: 'Остановок',
            errorMessage: 'Пожалуйста, добавьте минимум 2 остановки',
            exampleTitle: '💡 Пример маршрута:',
            exampleText: 'Киев → Одесса → Харьков → Львов',
            confirmBtn: action === 'edit' ? '✅ Сохранить изменения' : '✅ Подтвердить маршрут',
            successMessage: action === 'edit' ? '✅ Маршрут успешно изменен!' : '✅ Маршрут успешно сохранен!',
            errorSaving: 'Ошибка при сохранении маршрута. Попробуйте еще раз.',
            returnToBot: 'Вернуться к боту',
            addManually: '➕ Добавить "{query}" вручную',
            addManuallyDesc: 'Нажмите, чтобы добавить этот город к маршруту',
            ownCity: 'Собственный город',
            unknownCountry: 'Неизвестная страна'
        }
    };

    const t = translations[userLang] || translations.uk;

    // Пошук міст через API
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
            
            // Німеччина
            { name: 'Берлін', country: 'Німеччина' },
            { name: 'Мюнхен', country: 'Німеччина' },
            { name: 'Гамбург', country: 'Німеччина' },
            { name: 'Кельн', country: 'Німеччина' },
            { name: 'Франкфурт', country: 'Німеччина' },
            { name: 'Дюссельдорф', country: 'Німеччина' },
            { name: 'Дортмунд', country: 'Німеччина' },
            { name: 'Штутгарт', country: 'Німеччина' },
            
            // Чехія
            { name: 'Прага', country: 'Чехія' },
            { name: 'Брно', country: 'Чехія' },
            { name: 'Острава', country: 'Чехія' },
            { name: 'Пльзень', country: 'Чехія' },
            
            // Угорщина
            { name: 'Будапешт', country: 'Угорщина' },
            { name: 'Дебрецен', country: 'Угорщина' },
            { name: 'Сегед', country: 'Угорщина' },
            
            // Румунія
            { name: 'Бухарест', country: 'Румунія' },
            { name: 'Клуж-Напока', country: 'Румунія' },
            { name: 'Тімішоара', country: 'Румунія' },
            
            // Словаччина
            { name: 'Братислава', country: 'Словаччина' },
            { name: 'Кошице', country: 'Словаччина' },
            
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
            { name: 'Зальцбург', country: 'Австрія' },
            
            // Італія
            { name: 'Рим', country: 'Італія' },
            { name: 'Мілан', country: 'Італія' },
            { name: 'Неаполь', country: 'Італія' },
            { name: 'Флоренція', country: 'Італія' },
            
            // Франція
            { name: 'Париж', country: 'Франція' },
            { name: 'Марсель', country: 'Франція' },
            { name: 'Ліон', country: 'Франція' },
            
            // Іспанія
            { name: 'Мадрид', country: 'Іспанія' },
            { name: 'Барселона', country: 'Іспанія' },
            { name: 'Валенсія', country: 'Іспанія' }
        ];
        
        const lowerQuery = query.toLowerCase();
        return popularCities
            .filter(city => city.name.toLowerCase().includes(lowerQuery))
            .map(city => ({
                name: city.name,
                country: city.country,
                full_name: `${city.name}, ${city.country}`,
                lat: null,
                lon: null,
                source: 'popular'
            }))
            .slice(0, 10);
    };

    const searchCities = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        
        const normalizedQuery = query.toLowerCase().trim();
        
        // Перевіряємо кеш
        if (searchCache.current.has(normalizedQuery)) {
            console.log('Використовуємо кешований результат для:', normalizedQuery);
            const cachedResults = searchCache.current.get(normalizedQuery);
            setSuggestions(cachedResults);
            setShowSuggestions(true);
            return;
        }

        try {
            console.log('API запит для:', query);
            let cities = [];
            
            // Спочатку пробуємо OpenStreetMap Nominatim API
            try {
                const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=15&addressdetails=1&accept-language=${userLang}&countrycodes=ua,pl,de,cz,sk,hu,ro,at,by,md,lt,lv,ee,fr,it,es,nl,be,ch,bg`;
                
                const response = await fetch(nominatimUrl, {
                    headers: {
                        'User-Agent': 'VizokBot/1.0'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        cities = data
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
                                    full_name: city.display_name,
                                    lat: city.lat,
                                    lon: city.lon,
                                    source: 'nominatim',
                                    importance: city.importance || 0
                                };
                            })
                            // Сортуємо за важливістю
                            .sort((a, b) => (b.importance || 0) - (a.importance || 0))
                            .slice(0, 10);
                        
                        console.log('Nominatim results:', cities.length);
                    }
                }
            } catch (nominatimError) {
                console.log('Nominatim failed:', nominatimError);
            }
            
            // Якщо не знайдено результатів через API, використовуємо популярні міста
            if (cities.length === 0) {
                cities = getPopularCities(query);
                console.log('Використовуємо популярні міста:', cities.length);
            }

            // Видаляємо дублікати
            const uniqueCities = cities.filter((city, index, self) => 
                index === self.findIndex(c => 
                    c.name.toLowerCase() === city.name.toLowerCase()
                )
            );

            // Кешуємо результат
            searchCache.current.set(normalizedQuery, uniqueCities);
            
            console.log('Final unique cities:', uniqueCities.length);
            setSuggestions(uniqueCities);
            setShowSuggestions(true);
            
        } catch (error) {
            console.error('Error in searchCities:', error);
            // При помилці використовуємо популярні міста
            const fallbackCities = getPopularCities(query);
            searchCache.current.set(normalizedQuery, fallbackCities);
            setSuggestions(fallbackCities);
            setShowSuggestions(true);
        }
    };

    // Обробка введення в поле пошуку
    const handleCityInput = (e) => {
        const query = e.target.value.trim();
        setCityInput(e.target.value);
        
        if (query.length < 2) {
            setShowSuggestions(false);
            return;
        }

        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            searchCities(query);
        }, 300);
    };

    // Додавання зупинки
    const addStop = (name, country) => {
        const stop = { name, country };
        setStops([...stops, stop]);
        setCityInput('');
        setShowAddInput(false);
        setShowSuggestions(false);
    };

    // Видалення зупинки
    const removeStop = (index) => {
        const newStops = stops.filter((_, i) => i !== index);
        setStops(newStops);
    };

    // Обробка клавіш
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = cityInput.trim();
            if (query) {
                addStop(query, t.ownCity);
            }
        } else if (e.key === 'Escape') {
            setShowAddInput(false);
            setCityInput('');
            setShowSuggestions(false);
        }
    };

    // Обробка форми
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (stops.length < 2) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const cities = stops.map(stop => stop.name);
            const citiesString = cities.join(', ');
            
            console.log('Route data:', {
                action: 'cities_selected',
                cities: cities,
                cities_string: citiesString,
                stops: stops
            });

            // Відправляємо вебхук (не блокуючи форму при помилці)
            console.log('Sending webhook to:', webhookUrl);
            console.log('Current origin:', window.location.origin);
            
            const webhookData = {
                user_id: userId,
                stops: citiesString,
                lang: userLang,
                action: action,
                timestamp: new Date().toISOString()
            };
            
            // Відправляємо вебхук асинхронно, не чекаючи результату
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookData)
            }).then(response => {
                console.log('Webhook response:', response.status);
                if (response.ok) {
                    console.log('✅ Webhook sent successfully');
                } else {
                    console.log('⚠️ Webhook failed with status:', response.status);
                }
            }).catch(error => {
                console.log('❌ Webhook error:', error);
                console.log('💡 Using ngrok HTTPS tunnel:', webhookUrl);
            });

            // Симуляція відправки
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsSuccess(true);
            
            // Автоматично закриваємо WebApp після успішного збереження
            setTimeout(() => {
                const routeString = stops.map(stop => stop.name).join(' → ');
                closeTelegramWebApp({
                    type: 'route_created',
                    route: routeString,
                    stops_count: stops.length
                });
            }, 1500); // Затримка 1.5 секунди для показу повідомлення про успіх
            
        } catch (error) {
            console.error('Error saving route:', error);
            alert(t.errorSaving);
        } finally {
            setIsSubmitting(false);
        }
    };



    // Закриття підказок при кліку поза ними
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
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
        
        // Не використовуємо головну кнопку Telegram, використовуємо тільки кнопку на формі
        telegramWebApp.hideMainButton();

        return () => {
            // Очищуємо кеш при розмонтуванні компонента
            searchCache.current.clear();
        };
    }, []);

    if (isSuccess) {
        return (
            <div className="create-route-container">
                <div className="create-route-wrapper">
                    <div className="create-route-success">
                        <div className="create-route-success-icon">✅</div>
                        <h2 className="create-route-success-title">{t.successMessage}</h2>
                        <p style={{fontSize: '14px', color: 'var(--tg-theme-hint-color, #666)', marginBottom: '15px'}}>
                            {t.routeSaved || 'Маршрут успішно збережено! Поверніться в бота для продовження.'}
                        </p>
                        
                        <button 
                            onClick={() => {
                                const routeString = stops.map(stop => stop.name).join(' → ');
                                closeTelegramWebApp({
                                    type: 'route_created',
                                    route: routeString,
                                    stops_count: stops.length
                                });
                            }}
                            className="create-route-return-btn"
                        >
                            {t.returnToBot}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="create-route-container">
            <div className="create-route-wrapper">
                {/* Header */}
                <div className="create-route-header">
                    <h1>{t.pageTitle}</h1>
                    <p>{t.pageDescription}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Список зупинок */}
                    <div className="create-route-stops-container">
                        {stops.map((stop, index) => (
                            <div key={index} className="create-route-stop-item">
                                <div className="create-route-stop-number">{index + 1}</div>
                                <div className="create-route-stop-content">
                                    <div className="create-route-stop-name">{stop.name}</div>
                                    <div className="create-route-stop-country">{stop.country}</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeStop(index)}
                                    className="create-route-remove-stop"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Додавання нової зупинки */}
                    {showAddInput ? (
                        <div className="create-route-add-stop-container" ref={suggestionsRef}>
                            <div className="create-route-form-group">
                                <label>{t.addStopLabel}</label>
                                <input
                                    type="text"
                                    value={cityInput}
                                    onChange={handleCityInput}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t.cityPlaceholder}
                                    className="create-route-city-input"
                                    autoComplete="off"
                                    autoFocus
                                />
                            </div>
                            
                            {/* Підказки */}
                            {showSuggestions && (
                                <div className="create-route-suggestions-container">
                                    {suggestions.length === 0 ? (
                                        <div
                                            onClick={() => addStop(cityInput, t.unknownCountry)}
                                            className="create-route-suggestion-item manual-add"
                                        >
                                            <div className="create-route-suggestion-manual">
                                                {t.addManually.replace('{query}', cityInput)}
                                            </div>
                                            <div className="create-route-suggestion-manual-desc">
                                                {t.addManuallyDesc}
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {suggestions.map((city, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => addStop(city.name, city.country)}
                                                    className="create-route-suggestion-item"
                                                >
                                                    <div className="create-route-suggestion-name">{city.name}</div>
                                                    <div className="create-route-suggestion-country">
                                                        {city.country}
                                                        {city.source && (
                                                            <span style={{opacity: 0.7, marginLeft: '8px'}}>({city.source})</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <div
                                                onClick={() => addStop(cityInput, t.ownCity)}
                                                className="create-route-suggestion-item manual-add"
                                            >
                                                <div className="create-route-suggestion-manual">
                                                    {t.addManually.replace('{query}', cityInput)}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowAddInput(true)}
                            className="create-route-add-stop-btn"
                        >
                            {t.addStopBtn}
                        </button>
                    )}

                    {/* Лічильник зупинок */}
                    <div className="create-route-city-count">
                        {t.stopsCount}: {stops.length}
                    </div>

                    {/* Помилка */}
                    {stops.length < 2 && (
                        <div className="create-route-error">
                            {t.errorMessage}
                        </div>
                    )}

                    {/* Приклад */}
                    <div className="create-route-example">
                        <h3>{t.exampleTitle}</h3>
                        <p>{t.exampleText}</p>
                    </div>

                    {/* Єдина кнопка підтвердження */}
                    <button
                        type="submit"
                        disabled={stops.length < 2 || isSubmitting}
                        className="create-route-submit-btn"
                    >
                        {isSubmitting ? 'Збереження...' : t.confirmBtn}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateRoute; 