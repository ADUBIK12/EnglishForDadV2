// ==========================================
// 1. ПУЛ ФАЛЬШ-СЛОВ ДЛЯ ЗАПУТЫВАНИЯ
// ==========================================
const globalFakeWordsPool = [
  "to", "in", "at", "on", "with", "for", "by", "about", "me", "you", 
  "him", "her", "us", "them", "my", "your", "his", "their", "always", "never",
  "good", "bad", "ready", "clear", "details", "office", "car", "room", "book", "time",
  "would", "should", "could", "shall", "will", "going", "already", "yet", "still", "just"
];

// Вспомогательная функция для автоматического заполнения базы до 250 предложений в каждой теме
function fillTo250(existingArray, themeName, startLevel) {
  let currentCount = existingArray.length;
  let level = startLevel;
  while (currentCount < 250) {
    let calculatedLevel = Math.floor(currentCount / 50) + 1;
    existingArray.push({
      "text": `This is a template sentence number ${currentCount + 1} for testing level ${calculatedLevel}`,
      "translation": `Это шаблонное предложение номер ${currentCount + 1} для теста уровня ${calculatedLevel}`
    });
    currentCount++;
  }
  return existingArray;
}

// ==========================================
// 2. БАЗА ДАННЫХ ПРЕДЛОЖЕНИЙ
// ==========================================
const englishData = {
  // ------------------------------------------
  // ТЕМА 1: ПУТЕШЕСТВИЯ И ТУРИЗМ (TRAVEL)
  // ------------------------------------------
  "travel": fillTo250([
    // УРОВЕНЬ 1 (0-49): База, простые вопросы, три-четыре слова
    {"text": "Where is the hotel?", "translation": "Где находится отель?"},
    {"text": "I need a taxi.", "translation": "Мне нужно такси."},
    {"text": "Where is the airport?", "translation": "Где находится аэропорт?"},
    {"text": "Here is my passport.", "translation": "Вот мой паспорт."},
    {"text": "How much is this ticket?", "translation": "Сколько стоит этот билет?"},
    {"text": "I am a tourist.", "translation": "Я турист."},
    {"text": "Where is the train station?", "translation": "Где находится железнодорожный вокзал?"},
    {"text": "Help me please.", "translation": "Помогите мне пожалуйста."},
    {"text": "I do not understand you.", "translation": "Я вас не понимаю."},
    {"text": "Where is the bathroom?", "translation": "Где находится туалет?"},
    {"text": "Is this seat free?", "translation": "Это место свободно?"},
    {"text": "I lost my bag.", "translation": "Я потерял свою сумку."},
    {"text": "Open the door please.", "translation": "Откройте дверь пожалуйста."},
    {"text": "What time is it?", "translation": "Который час?"},
    {"text": "I love this city.", "translation": "Я люблю этот город."},
    // Заполняем остаток Уровня 1 заглушками, чтобы перешагнуть за 50
    ...Array(35).fill({"text": "Where is the bus stop?", "translation": "Где автобусная остановка?"}),

    // УРОВЕНЬ 2 (50-99): Вежливые просьбы, будущее и прошедшее время (Past/Future Simple)
    {"text": "Could you please repeat that slowly?", "translation": "Не могли бы вы повторить это помедленнее?"},
    {"text": "I would like to book a room for two nights.", "translation": "Я бы хотел забронировать номер на две ночи."},
    {"text": "Does this bus go to the city center?", "translation": "Этот автобус едет в центр города?"},
    {"text": "We are going to visit the museum tomorrow.", "translation": "Завтра мы собираемся посетить музей."},
    {"text": "Can I pay by credit card here?", "translation": "Могу ли я оплатить здесь кредитной картой?"},
    {"text": "Where can I change my money?", "translation": "Где я могу обменять деньги?"},
    {"text": "I arrived at the station yesterday morning.", "translation": "Я прибыл на станцию вчера утром."},
    {"text": "Could you bring me some water please?", "translation": "Не могли бы вы принести мне немного воды?"},
    {"text": "We will rent a small car for our trip.", "translation": "Мы арендуем маленькую машину для нашей поездки."},
    {"text": "Is breakfast included in the room price?", "translation": "Завтрак включен в стоимость номера?"},
    ...Array(40).fill({"text": "I want to see the map.", "translation": "Я хочу посмотреть карту."}),

    // УРОВЕНЬ 3 (100-149): Сравнения, развернутые фразы, модальные глаголы
    {"text": "You should check your terminal number on the ticket.", "translation": "Вам следует проверить номер вашего терминала в билете."},
    {"text": "This hotel is much more comfortable than the previous one.", "translation": "Этот отель гораздо более комфортный, чем предыдущий."},
    {"text": "Can you recommend a good local restaurant nearby?", "translation": "Можете порекомендовать хороший местный ресторан неподалеку?"},
    {"text": "We must arrive at the airport three hours before the flight.", "translation": "Мы должны прибыть в аэропорт за три часа до вылета."},
    {"text": "The tour guide explained everything very clearly to the group.", "translation": "Экскурсовод очень понятно всё объяснил группе."},
    ...Array(45).fill({"text": "The weather is changing.", "translation": "Погода меняется."}),

    // УРОВЕНЬ 4 (150-199): Совершенное время (Present Perfect), инфинитивные обороты
    {"text": "I have never seen such a beautiful city before.", "translation": "Я никогда раньше не видел такого красивого города."},
    {"text": "It is too late to change our flight reservation now.", "translation": "Уже слишком поздно менять наше бронирование рейса сейчас."},
    {"text": "They have already checked in all their heavy luggage.", "translation": "Они уже зарегистрировали весь свой тяжелый багаж."},
    {"text": "I am looking forward to exploring the old town streets.", "translation": "Я с нетерпением жду возможности исследовать улицы старого города."},
    ...Array(46).fill({"text": "We have traveled a lot.", "translation": "Мы много путешествовали."}),

    // УРОВЕНЬ 5 (200-249): Условные предложения (If), пассивный залог
    {"text": "If the weather worsens the flight will be canceled.", "translation": "Если погода ухудшится, рейс будет отменен."},
    {"text": "The luggage must be checked before entering the security zone.", "translation": "Багаж должен быть проверен перед входом в зону безопасности."},
    {"text": "Had we missed that train we would have lost our hotel booking.", "translation": "Если бы мы опоздали на тот поезд, мы бы потеряли бронь в отеле."},
    {"text": "The historic castle is currently being restored by local experts.", "translation": "Исторический замок в настоящее время реставрируется местными экспертами."}
  ], "travel", 204),

  // ------------------------------------------
  // ТЕМА 2: БИЗНЕС И РАБОТА (BUSINESS)
  // ------------------------------------------
  "business": fillTo250([
    // УРОВЕНЬ 1 (0-49)
    {"text": "Let's start the meeting.", "translation": "Давайте начнем собрание."},
    {"text": "This is my boss.", "translation": "Это мой босс."},
    {"text": "I work in an office.", "translation": "Я работаю в офисе."},
    {"text": "We need more time.", "translation": "Нам нужно больше времени."},
    {"text": "Send me the email.", "translation": "Отправьте мне электронное письмо."},
    {"text": "The project is ready.", "translation": "Проект готов."},
    {"text": "Where is the document?", "translation": "Где документ?"},
    ...Array(43).fill({"text": "Call me later.", "translation": "Позвони мне позже."}),

    // УРОВЕНЬ 2 (50-99)
    {"text": "We need to discuss the details of the contract.", "translation": "Нам нужно обсудить детали контракта."},
    {"text": "I am sending you the updated financial report.", "translation": "Я отправляю вам обновленный финансовый отчет."},
    {"text": "He will call you back in ten minutes.", "translation": "Он перезвонит вам через десять минут."},
    {"text": "Our team finished the task successfully last week.", "translation": "Наша команда успешно завершила задачу на прошлой неделе."},
    ...Array(46).fill({"text": "Sign this paper.", "translation": "Подпишите эту бумагу."}),

    // УРОВЕНЬ 3 (100-149)
    {"text": "Our sales have increased significantly over the last quarter.", "translation": "Наши продажи значительно выросли за последний квартал."},
    {"text": "We must find a way to reduce our company expenses.", "translation": "Мы должны найти способ сократить расходы нашей компании."},
    {"text": "Can we schedule a short online presentation for Friday morning?", "translation": "Можем ли мы запланировать короткую онлайн-презентацию на утро пятницы?"},
    ...Array(47).fill({"text": "They accepted our terms.", "translation": "Они приняли наши условия."}),

    // УРОВЕНЬ 4 (150-199)
    {"text": "We have already signed the agreement with our new partners.", "translation": "Мы уже подписали соглашение с нашими новыми партнерами."},
    {"text": "The marketing manager has been preparing this campaign for months.", "translation": "Менеджер по маркетингу готовил эту кампанию несколько месяцев."},
    ...Array(48).fill({"text": "The market is growing.", "translation": "Рынок растет."}),

    // УРОВЕНЬ 5 (200-249)
    {"text": "Had we known the risks we would not have invested.", "translation": "Если бы мы знали о рисках, мы бы не стали инвестировать."},
    {"text": "The business strategy is being developed by our leading analytics team.", "translation": "Бизнес-стратегия сейчас разрабатывается нашей ведущей командой аналитиков."}
  ], "business", 202),

  // ------------------------------------------
  // ТЕМА 3: БЫТ И ПОВСЕДНЕВНАЯ ЖИЗНЬ (DAILY)
  // ------------------------------------------
  "daily": fillTo250([
    // УРОВЕНЬ 1 (0-49)
    {"text": "I cook breakfast every morning.", "translation": "Я готовлю завтрак каждое утро."},
    {"text": "Where are my keys?", "translation": "Где мои ключи?"},
    {"text": "I want to drink coffee.", "translation": "Я хочу выпить кофе."},
    {"text": "Let's go for a walk.", "translation": "Давай пойдем на прогулку."},
    {"text": "The weather is good today.", "translation": "Погода сегодня хорошая."},
    ...Array(45).fill({"text": "Open the window.", "translation": "Открой окно."}),

    // УРОВЕНЬ 2 (50-99)
    {"text": "Can you buy some milk on your way home?", "translation": "Можешь купить молока по дороге домой?"},
    {"text": "I need to clean the kitchen before dinner.", "translation": "Мне нужно убрать кухню перед ужином."},
    {"text": "My son is doing his homework in his room.", "translation": "Мой сын делает домашнее задание в своей комнате."},
    ...Array(47).fill({"text": "I like reading books.", "translation": "Мне нравится читать книги."}),

    // УРОВЕНЬ 3 (100-149)
    {"text": "It takes me thirty minutes to get to the store.", "translation": "У меня уходит тридцать минут, чтобы добраться до магазина."},
    {"text": "We should buy a new refrigerator next month because this one is broken.", "translation": "Нам следует купить новый холодильник в следующем месяце, потому что этот сломался."},
    ...Array(48).fill({"text": "We watched a movie.", "translation": "Мы посмотрели фильм."}),

    // УРОВЕНЬ 4 (150-199)
    {"text": "I have been trying to fix this washing machine all day.", "translation": "Я весь день пытаюсь починить эту стиральную машину."},
    {"text": "By the time my wife arrived home I had already prepared everything.", "translation": "К тому времени, как жена пришла домой, я уже всё приготовил."},
    ...Array(48).fill({"text": "The dinner smells good.", "translation": "Ужин пахнет хорошо."}),

    // УРОВЕНЬ 5 (200-249)
    {"text": "No matter how busy I am I always find time for family.", "translation": "Независимо от того, насколько я занят, я всегда нахожу время для семьи."},
    {"text": "If we had cleaned the house yesterday we would not be so tired now.", "translation": "Если бы мы убрались в доме вчера, мы бы не были такими уставшими сейчас."}
  ], "daily", 202),

  // ------------------------------------------
  // ТЕМА 4: ОБЪЕДИНЕННАЯ — ДЕЛОВАЯ ПОЕЗДКА (MIXED_1)
  // ------------------------------------------
  "mixed_1": fillTo250([
    // УРОВЕНЬ 1 (0-49)
    {"text": "I need a ticket for a business trip.", "translation": "Мне нужен билет для деловой поездки."},
    {"text": "Where is the conference hotel?", "translation": "Где находится отель для конференций?"},
    ...Array(48).fill({"text": "I pack my bag.", "translation": "Я собираю сумку."}),

    // УРОВЕНЬ 2 (50-99)
    {"text": "Our company will pay for the hotel during the trip.", "translation": "Наша компания оплатит отель во время поездки."},
    {"text": "I have to print the business presentation before my flight.", "translation": "Мне нужно распечатать рабочую презентацию перед моим вылетом."},
    ...Array(48).fill({"text": "I arrived at the airport.", "translation": "Я прибыл в аэропорт."}),

    // УРОВЕНЬ 3 (100-149)
    {"text": "I am going to meet our international partners at the airport lounge.", "translation": "Я собираюсь встретить наших международных партнеров в бизнес-зале аэропорта."},
    {"text": "We can review the contract terms while waiting for our boarding call.", "translation": "Мы можем просмотреть условия контракта, пока ждем объявления на посадку."},
    ...Array(48).fill({"text": "The meeting went well.", "translation": "Встреча прошла хорошо."}),

    // УРОВЕНЬ 4 (150-199)
    {"text": "We have successfully rescheduled our flight to attend the urgent negotiations.", "translation": "Мы успешно перенесли наш рейс, чтобы посетить срочные переговоры."},
    {"text": "Our delegation has already checked into the conference venue hotel center.", "translation": "Наша делегация уже заселилась в отель при центре проведения конференции."},
    ...Array(48).fill({"text": "Contracts were signed.", "translation": "Контракты были подписаны."}),

    // УРОВЕНЬ 5 (200-249)
    {"text": "Should the presentation be delayed we will have to extend our hotel stay.", "translation": "Если презентация задержится, нам придется продлить пребывание в отеле."},
    {"text": "The business visas were issued just a few hours before the plane took off.", "translation": "Деловые визы были выданы всего за несколько часов до того, как самолет взлетел."}
  ], "mixed_1", 202),

  // ------------------------------------------
  // ТЕМА 5: ОБЪЕДИНЕННАЯ — ВЕЧЕР ПОСЛЕ РАБОТЫ (MIXED_2)
  // ------------------------------------------
  "mixed_2": fillTo250([
    // УРОВЕНЬ 1 (0-49)
    {"text": "I am tired after work.", "translation": "Я устал после работы."},
    {"text": "Let's eat dinner and talk about business.", "translation": "Давай поужинаем и поговорим о бизнесе."},
    ...Array(48).fill({"text": "I am going home.", "translation": "Я иду домой."}),

    // УРОВЕНЬ 2 (50-99)
    {"text": "I often answer important business emails while sitting in my kitchen.", "translation": "Я часто отвечаю на важные рабочие письма, сидя у себя на кухне."},
    {"text": "We need to buy groceries after we finish this conference call.", "translation": "Нам нужно купить продукты после того, как мы закончим этот рабочий созвон."},
    ...Array(48).fill({"text": "The tea is hot.", "translation": "Чай горячий."}),

    // УРОВЕНЬ 3 (100-149)
    {"text": "I prefer to leave all my work problems at the office before entering my house.", "translation": "Я предпочитаю оставлять все свои рабочие проблемы в офисе перед тем, как зайти в дом."},
    {"text": "Can you call the manager from home to verify the project status tonight?", "translation": "Можешь позвонить менеджеру из дома, чтобы проверить статус проекта сегодня вечером?"},
    ...Array(48).fill({"text": "He likes his flat.", "translation": "Ему нравится его квартира."}),

    // УРОВЕНЬ 4 (150-199)
    {"text": "My family has grown used to me working from home on Friday evenings.", "translation": "Моя семья уже привыкла к тому, что я работаю из дома по пятничным вечерам."},
    {"text": "I have been reviewing these documents at my desk since I came home from work.", "translation": "Я проверяю эти документы за своим столом с тех пор, как пришел домой с работы."},
    ...Array(48).fill({"text": "The job is done.", "translation": "Работа сделана."}),

    // УРОВЕНЬ 5 (200-249)
    {"text": "If I had not completed the report at home I would have been in trouble today.", "translation": "Если бы я не закончил отчет дома, сегодня у меня были бы неприятности."},
    {"text": "The laptop should be turned off as soon as you step inside your living room.", "translation": "Ноутбук должен быть выключен, как только вы переступаете порог своей гостиной."}
  ], "mixed_2", 202)
};
