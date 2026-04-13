# Political Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Один HTML-файл — ситуационный тест политических взглядов по 4 осям, с ироничной подачей, mobile-first, деплой на aristokrab.ru/quiz.

**Architecture:** Единый index.html с inline CSS и JS. Три "экрана" (div-секции), переключаемые через display:none/flex. Данные вопросов, веса и типы — JS-объекты в скрипте. Результат кодируется как 4 числа через дефис.

**Tech Stack:** HTML5, CSS3 (flexbox, media queries), Vanilla JS, системные шрифты (Georgia + system-ui)

---

## File Structure

- Create: `quiz/index.html` — единственный файл, содержит всё (HTML + CSS + JS)

---

### Task 1: HTML-скелет + CSS-стили

Создаём полную HTML-структуру с тремя экранами и все стили. Без JS — просто визуальная основа.

**Files:**
- Create: `quiz/index.html`

- [ ] **Step 1: Создать файл с полной HTML-структурой и стилями**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Политкабинет</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #f5f0e8;
            color: #2a2a2a;
            min-height: 100dvh;
        }

        .screen { display: none; flex-direction: column; min-height: 100dvh; padding: 24px 16px; }
        .screen.active { display: flex; }

        /* --- Welcome Screen --- */
        .welcome {
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 24px;
        }
        .welcome h1 {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 2.4rem;
            line-height: 1.1;
            letter-spacing: -0.02em;
        }
        .welcome .subtitle {
            font-size: 1.1rem;
            color: #666;
            max-width: 320px;
        }
        .welcome input[type="text"] {
            font-size: 1.2rem;
            padding: 14px 20px;
            border: 2px solid #c8c0b0;
            border-radius: 12px;
            background: #fff;
            text-align: center;
            width: 100%;
            max-width: 280px;
            outline: none;
        }
        .welcome input[type="text"]:focus { border-color: #8b7355; }
        .welcome .btn-start {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.3rem;
            padding: 16px 48px;
            background: #2a2a2a;
            color: #f5f0e8;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: transform 0.1s;
        }
        .welcome .btn-start:active { transform: scale(0.97); }
        .welcome .btn-start:disabled { opacity: 0.4; cursor: default; }

        /* --- Quiz Screen --- */
        .quiz { gap: 20px; }
        .progress-bar {
            height: 6px;
            background: #ddd5c8;
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: #8b7355;
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        .question-number {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 0.9rem;
            color: #999;
            text-align: center;
        }
        .question-text {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.3rem;
            line-height: 1.4;
            text-align: center;
            padding: 8px 0 12px;
        }
        .options { display: flex; flex-direction: column; gap: 12px; flex: 1; justify-content: center; }
        .option {
            padding: 18px 20px;
            background: #fff;
            border: 2px solid #e0d9ce;
            border-radius: 14px;
            font-size: 1.05rem;
            line-height: 1.35;
            cursor: pointer;
            transition: border-color 0.15s, transform 0.1s;
            -webkit-tap-highlight-color: transparent;
        }
        .option:active { transform: scale(0.98); border-color: #8b7355; }

        /* --- Result Screen --- */
        .result {
            align-items: center;
            gap: 20px;
            padding-top: 40px;
        }
        .result-emoji { font-size: 4rem; }
        .result-type {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 2rem;
            text-align: center;
            line-height: 1.2;
        }
        .result-desc {
            font-size: 1.05rem;
            color: #555;
            text-align: center;
            max-width: 360px;
            line-height: 1.5;
        }
        .axes { width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 16px; margin-top: 12px; }
        .axis-row { display: flex; flex-direction: column; gap: 4px; }
        .axis-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; }
        .axis-bar {
            height: 10px;
            background: #e0d9ce;
            border-radius: 5px;
            position: relative;
            overflow: visible;
        }
        .axis-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 0.6s ease;
        }
        .axis-marker {
            position: absolute;
            top: -4px;
            width: 18px;
            height: 18px;
            background: #2a2a2a;
            border-radius: 50%;
            border: 3px solid #f5f0e8;
            transform: translateX(-50%);
            transition: left 0.6s ease;
        }
        .axis-econ .axis-fill { background: #c0392b; }
        .axis-diplo .axis-fill { background: #2980b9; }
        .axis-gov .axis-fill { background: #27ae60; }
        .axis-soc .axis-fill { background: #f39c12; }

        .result-code-section {
            margin-top: 16px;
            text-align: center;
        }
        .result-code-label { font-size: 0.85rem; color: #999; margin-bottom: 8px; }
        .result-code {
            font-family: 'Courier New', monospace;
            font-size: 1.8rem;
            letter-spacing: 0.1em;
            background: #fff;
            padding: 12px 24px;
            border-radius: 12px;
            border: 2px solid #e0d9ce;
            cursor: pointer;
            transition: border-color 0.15s;
        }
        .result-code:active { border-color: #8b7355; }
        .result-code-hint { font-size: 0.8rem; color: #aaa; margin-top: 6px; }

        .btn-restart {
            margin-top: 20px;
            padding: 12px 32px;
            background: none;
            border: 2px solid #c8c0b0;
            border-radius: 12px;
            font-size: 1rem;
            color: #666;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <!-- Screen 1: Welcome -->
    <div id="screen-welcome" class="screen welcome active">
        <div style="font-size: 3.5rem;">🏛️</div>
        <h1>Политкабинет</h1>
        <p class="subtitle">24 житейские ситуации покажут, какой вы политический зверь на самом деле</p>
        <input type="text" id="input-name" placeholder="Как вас зовут?" autocomplete="off">
        <button class="btn-start" id="btn-start" disabled>Поехали</button>
    </div>

    <!-- Screen 2: Quiz -->
    <div id="screen-quiz" class="screen quiz">
        <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
        <div class="question-number" id="question-number"></div>
        <div class="question-text" id="question-text"></div>
        <div class="options" id="options"></div>
    </div>

    <!-- Screen 3: Result -->
    <div id="screen-result" class="screen result">
        <div class="result-emoji" id="result-emoji"></div>
        <div class="result-type" id="result-type"></div>
        <div class="result-desc" id="result-desc"></div>
        <div class="axes" id="axes">
            <div class="axis-row axis-econ">
                <div class="axis-labels"><span>Равенство</span><span>Рынок</span></div>
                <div class="axis-bar"><div class="axis-fill"></div><div class="axis-marker" id="marker-econ"></div></div>
            </div>
            <div class="axis-row axis-diplo">
                <div class="axis-labels"><span>Глобализм</span><span>Нация</span></div>
                <div class="axis-bar"><div class="axis-fill"></div><div class="axis-marker" id="marker-diplo"></div></div>
            </div>
            <div class="axis-row axis-gov">
                <div class="axis-labels"><span>Свобода</span><span>Авторитаризм</span></div>
                <div class="axis-bar"><div class="axis-fill"></div><div class="axis-marker" id="marker-gov"></div></div>
            </div>
            <div class="axis-row axis-soc">
                <div class="axis-labels"><span>Прогресс</span><span>Традиция</span></div>
                <div class="axis-bar"><div class="axis-fill"></div><div class="axis-marker" id="marker-soc"></div></div>
            </div>
        </div>
        <div class="result-code-section">
            <div class="result-code-label">Ваш код результата</div>
            <div class="result-code" id="result-code"></div>
            <div class="result-code-hint">Нажмите чтобы скопировать</div>
        </div>
        <button class="btn-restart" id="btn-restart">Пройти заново</button>
    </div>

<script>
// JS will be added in subsequent tasks
</script>
</body>
</html>
```

- [ ] **Step 2: Проверить вёрстку в браузере**

Run: `open quiz/index.html`

Проверить: экран приветствия виден, стили газетного фона и типографика на месте, поле ввода и кнопка по центру. На мобильном (DevTools, iPhone SE) — всё вмещается без скролла.

- [ ] **Step 3: Commit**

```bash
git add quiz/index.html
git commit -m "feat: quiz HTML skeleton with all 3 screens and CSS styles"
```

---

### Task 2: Данные вопросов (24 ситуационных вопроса с весами)

Наполняем массив `questions` — 24 бытовые ситуации, по 6 на каждую ось. Каждый вариант сдвигает 1-2 оси. Все варианты равно привлекательны, политические термины замаскированы.

**Files:**
- Modify: `quiz/index.html` (секция `<script>`)

- [ ] **Step 1: Вписать массив вопросов в script-секцию**

Заменить `// JS will be added in subsequent tasks` на полный массив. Формат каждого вопроса:

```javascript
const questions = [
    // --- Экономика (6 вопросов) ---
    {
        text: "Ваш знакомый открыл кофейню. Через полгода жалуется: аренда душит, налоги бешеные, еле выживает. Что думаете?",
        options: [
            { text: "Сам выбрал — бизнес есть бизнес, никто не обещал лёгких денег", scores: { econ: +8 } },
            { text: "Государство должно помогать малому бизнесу, а не душить", scores: { econ: +4, gov: -4 } },
            { text: "Может, лучше бы работал по найму — стабильнее и спокойнее", scores: { econ: -6, gov: +4 } },
            { text: "Надо объединяться с другими кофейнями и вместе давить на арендодателей", scores: { econ: -8 } },
        ]
    },
    {
        text: "В вашем доме сломался лифт. Управляющая компания говорит: ремонт через месяц. Что делать?",
        options: [
            { text: "Скинуться жильцами, нанять частную фирму — быстрее и надёжнее", scores: { econ: +8 } },
            { text: "Писать жалобы, добиваться от УК — мы за это платим", scores: { econ: -4, gov: +6 } },
            { text: "Организовать собрание жильцов и решить коллективно, что делать", scores: { econ: -6 } },
            { text: "Ходить пешком. Месяц не срок, зато бесплатно", scores: { econ: -2, soc: +4 } },
        ]
    },
    {
        text: "Друг предлагает вложиться в его стартап. Говорит, через год x10. Ваша реакция?",
        options: [
            { text: "Интересно, какой процент мне достанется? Давай обсудим условия", scores: { econ: +10 } },
            { text: "Лучше положу на вклад — пусть медленно, зато надёжно", scores: { econ: +2, soc: +4 } },
            { text: "А почему не сделать это как кооператив? Все вкладывают, все получают", scores: { econ: -8 } },
            { text: "Зачем рисковать? Хорошая работа — это тоже нормально", scores: { econ: -4 } },
        ]
    },
    {
        text: "Компания, где вы работаете, резко подняла цены. Клиенты возмущены. Ваша позиция?",
        options: [
            { text: "Рынок есть рынок — не нравится, пусть идут к конкурентам", scores: { econ: +8 } },
            { text: "Это жадность. Должны быть ограничения на рост цен", scores: { econ: -8, gov: +6 } },
            { text: "Сотрудникам-то хотя бы подняли зарплату? Вот что важно", scores: { econ: -6 } },
            { text: "Надо было заранее предупреждать и объяснять причины", scores: { econ: +2, soc: -2 } },
        ]
    },
    {
        text: "Сосед по даче собирает огромный урожай яблок и продаёт на рынке. Другой сосед возмущается: 'Нажимается на всех!'",
        options: [
            { text: "Молодец, что зарабатывает. Все могут так же, если постараются", scores: { econ: +10 } },
            { text: "Мог бы и поделиться с соседями — земля-то общая, дачная", scores: { econ: -8 } },
            { text: "Завидовать нехорошо, но и хвастаться прибылью не стоит", scores: { econ: +2, soc: +4 } },
            { text: "Лучше бы организовали общий сад — всем хватит", scores: { econ: -6, diplo: -2 } },
        ]
    },
    {
        text: "В городе закрывается единственный книжный магазин — не выдержал конкуренции с маркетплейсами. Ваша реакция?",
        options: [
            { text: "Грустно, но это естественный отбор. Значит, людям удобнее онлайн", scores: { econ: +8, soc: -4 } },
            { text: "Город должен поддерживать такие места — дотации, льготная аренда", scores: { econ: -6, gov: +4 } },
            { text: "Можно было бы сделать его кооперативным — жители скидываются и держат", scores: { econ: -8 } },
            { text: "Может, владелец просто не умеет вести бизнес? Надо адаптироваться", scores: { econ: +6 } },
        ]
    },

    // --- Дипломатия (6 вопросов) ---
    {
        text: "Вашу дочь позвали учиться по обмену в другую страну на год. Ей 16.",
        options: [
            { text: "Отличный шанс! Мир большой, пусть увидит его пораньше", scores: { diplo: -10 } },
            { text: "Рановато. Пусть сначала в своей стране образование получит", scores: { diplo: +8, soc: +4 } },
            { text: "Зависит от страны. В Европу — ладно, куда подальше — нет", scores: { diplo: +2 } },
            { text: "Пусть сама решает — в 16 уже пора учиться принимать решения", scores: { diplo: -4, gov: -6 } },
        ]
    },
    {
        text: "В вашем районе открылся ресторан с кухней далёкой страны. Там непривычные запахи и громкая музыка по вечерам.",
        options: [
            { text: "Здорово, разнообразие! Схожу попробовать", scores: { diplo: -8, soc: -4 } },
            { text: "Пусть работает, но музыку после 22 — убавить", scores: { diplo: -2, gov: +4 } },
            { text: "Не нравится. Район меняется, и не в лучшую сторону", scores: { diplo: +8, soc: +6 } },
            { text: "Свой ресторан своей кухни открыли бы лучше", scores: { diplo: +6 } },
        ]
    },
    {
        text: "Ваша компания нанимает разработчика из другой страны на удалёнку. Он дешевле местных кандидатов на 40%.",
        options: [
            { text: "Отлично, экономия. Талант не имеет границ", scores: { diplo: -10, econ: +6 } },
            { text: "Надо в первую очередь давать работу своим", scores: { diplo: +10 } },
            { text: "Если качество то же — почему нет? Но приоритет — местным", scores: { diplo: +4 } },
            { text: "Сначала посмотрел бы, как он работает в команде, культура важна", scores: { diplo: +2, soc: +2 } },
        ]
    },
    {
        text: "По телевизору показывают наводнение в далёкой стране. Собирают пожертвования.",
        options: [
            { text: "Перечислю сколько могу. Люди — это люди, неважно где", scores: { diplo: -10 } },
            { text: "У нас своих проблем хватает. Пусть их соседи помогают", scores: { diplo: +10 } },
            { text: "Помогу, но символически. В первую очередь — свои", scores: { diplo: +4 } },
            { text: "Лучше бы эти деньги шли через международные организации, а не напрямую", scores: { diplo: -4, gov: +4 } },
        ]
    },
    {
        text: "Ребёнок из школы пришёл и говорит, что у них новый ученик — не говорит по-русски.",
        options: [
            { text: "Классно! Пусть дружат, выучат пару слов друг у друга", scores: { diplo: -8, soc: -4 } },
            { text: "А его вообще можно было так записать? Он же не понимает уроки", scores: { diplo: +6, gov: +4 } },
            { text: "Школа должна была подготовить адаптацию — это их работа", scores: { diplo: -2, gov: +6 } },
            { text: "Пусть сначала язык выучит, потом в обычный класс", scores: { diplo: +8 } },
        ]
    },
    {
        text: "Вам предлагают купить товар: точно такой же, но один произведён в вашей стране (дороже), другой — импорт (дешевле).",
        options: [
            { text: "Возьму дешевле. Кошелёк важнее патриотизма", scores: { diplo: -6, econ: +6 } },
            { text: "Возьму своё. Надо поддерживать своих производителей", scores: { diplo: +10 } },
            { text: "Посмотрю на качество, а не на страну", scores: { diplo: -4 } },
            { text: "Зависит от товара. Электроника — импорт, еда — своя", scores: { diplo: +4 } },
        ]
    },

    // --- Государство (6 вопросов) ---
    {
        text: "Вы узнали, что сосед сверху сдаёт квартиру посуточно через Airbnb. Шумно, незнакомые люди в подъезде.",
        options: [
            { text: "Его квартира — его дело. Я не буду лезть", scores: { gov: -10 } },
            { text: "Напишу жалобу в управу. Должны быть правила", scores: { gov: +8 } },
            { text: "Поговорю с ним лично. Может договоримся", scores: { gov: -4 } },
            { text: "Такие вещи надо запрещать законом. Жильё — не гостиница", scores: { gov: +10 } },
        ]
    },
    {
        text: "Камеры видеонаблюдения ставят по всему городу. Говорят — для безопасности.",
        options: [
            { text: "Отлично. Преступности станет меньше", scores: { gov: +10 } },
            { text: "Не нравится. Чувствую себя под колпаком", scores: { gov: -8 } },
            { text: "Нормально, если данные защищены и доступ ограничен", scores: { gov: +2 } },
            { text: "Слежка есть слежка. Сегодня камеры, завтра что?", scores: { gov: -10 } },
        ]
    },
    {
        text: "Знакомый хвастается, что нашёл способ не платить один из налогов. Всё легально, лазейка в законе.",
        options: [
            { text: "Молодец, налоги и так грабительские. Государство не заслужило", scores: { gov: -8, econ: +4 } },
            { text: "Формально легально, но морально сомнительно", scores: { gov: +4 } },
            { text: "Лазейку надо закрыть. Все должны платить одинаково", scores: { gov: +8 } },
            { text: "Расскажи как! Тоже хочу", scores: { gov: -6, econ: +6 } },
        ]
    },
    {
        text: "Ваш ребёнок-подросток хочет сделать татуировку.",
        options: [
            { text: "Его тело — его выбор. Поддержу", scores: { gov: -8, soc: -6 } },
            { text: "Пусть подождёт до 18. Решения должны быть зрелыми", scores: { gov: +6, soc: +4 } },
            { text: "Обсудим вместе. Послушаю почему, расскажу о последствиях", scores: { gov: -2 } },
            { text: "Пока живёт в моём доме — по моим правилам", scores: { gov: +10, soc: +6 } },
        ]
    },
    {
        text: "Правительство предлагает ввести обязательную службу (не армия — волонтёрство, помощь пожилым) для всех молодых людей на полгода.",
        options: [
            { text: "Хорошая идея. Дисциплина и чувство долга не помешают", scores: { gov: +10 } },
            { text: "Обязаловка — всегда плохо. Хочешь помогать — помогай сам", scores: { gov: -10 } },
            { text: "Неплохо, но добровольно и с нормальной оплатой", scores: { gov: -4 } },
            { text: "Зависит от реализации. Идея хорошая, но у нас всё испортят", scores: { gov: +2, soc: +2 } },
        ]
    },
    {
        text: "В школе предлагают ввести дресс-код для учеников.",
        options: [
            { text: "Правильно. Все равны, нечего выпендриваться", scores: { gov: +8, econ: -4 } },
            { text: "Глупость. Пусть выражают себя как хотят", scores: { gov: -8, soc: -6 } },
            { text: "Базовые требования — да (опрятность), форма — нет", scores: { gov: +2 } },
            { text: "Если родители и дети согласны — пусть будет", scores: { gov: -4 } },
        ]
    },

    // --- Общество (6 вопросов) ---
    {
        text: "Друзья зовут на новогоднюю вечеринку 31 декабря. Ваши родители обижаются — 'Новый год надо встречать семьёй!'",
        options: [
            { text: "Пойду к друзьям. Традиции не должны быть обязаловкой", scores: { soc: -8 } },
            { text: "Останусь с семьёй. Некоторые вещи важнее", scores: { soc: +10 } },
            { text: "До 12 с семьёй, после — к друзьям. Все довольны", scores: { soc: +2 } },
            { text: "Позову всех вместе — и родителей, и друзей", scores: { soc: -4, diplo: -2 } },
        ]
    },
    {
        text: "Знакомая пара решила не регистрировать брак. Живут вместе 5 лет, ребёнок. Ваше мнение?",
        options: [
            { text: "Их дело. Штамп в паспорте ничего не меняет", scores: { soc: -10 } },
            { text: "Ради ребёнка надо бы оформить. Это ответственность", scores: { soc: +8 } },
            { text: "Ну хотя бы нотариальные договорённости сделайте — для защиты ребёнка", scores: { soc: -2, gov: +4 } },
            { text: "Брак — основа общества. Не понимаю этого тренда", scores: { soc: +10 } },
        ]
    },
    {
        text: "В вашей компании молодой сотрудник предлагает полностью изменить процесс работы. Опытные против.",
        options: [
            { text: "Давайте попробуем! Если не экспериментировать — не вырастем", scores: { soc: -10 } },
            { text: "Старые методы работали годами. Не надо ломать то, что работает", scores: { soc: +10 } },
            { text: "Пусть покажет на маленьком проекте. Если сработает — масштабируем", scores: { soc: -4 } },
            { text: "Нужно выслушать обе стороны и найти компромисс", scores: { soc: +2 } },
        ]
    },
    {
        text: "Сын говорит, что хочет стать художником. Тёща говорит: 'Пусть идёт на нормальную специальность!'",
        options: [
            { text: "Пусть занимается тем, что любит. Жизнь одна", scores: { soc: -8, gov: -4 } },
            { text: "Тёща права. Сначала надёжная профессия, потом хобби", scores: { soc: +8, econ: +4 } },
            { text: "Можно совместить — дизайн, архитектура. И творчество, и хлеб", scores: { soc: -2 } },
            { text: "В нашей семье все были инженерами. Есть ценности, которые передаются", scores: { soc: +10 } },
        ]
    },
    {
        text: "В районе хотят снести старый дом культуры и построить современный коворкинг.",
        options: [
            { text: "Давно пора. Город должен меняться, а не стоять в прошлом", scores: { soc: -10, econ: +4 } },
            { text: "Нельзя! Это наша история, часть района", scores: { soc: +10 } },
            { text: "Можно реконструировать — сохранить фасад, внутри сделать современное пространство", scores: { soc: +2, econ: +2 } },
            { text: "А что жители района хотят? Пусть проголосуют", scores: { soc: -4, gov: -4 } },
        ]
    },
    {
        text: "Бабушка просит внука прийти в церковь / мечеть / синагогу на праздник. Внук — атеист.",
        options: [
            { text: "Пусть сходит ради бабушки. Уважение к старшим важнее принципов", scores: { soc: +10 } },
            { text: "Не должен. Насаждать религию — это давление", scores: { soc: -8, gov: -4 } },
            { text: "Может сходить как на культурное мероприятие, без участия в обрядах", scores: { soc: +2, diplo: -2 } },
            { text: "Пусть честно скажет что думает. Отношения строятся на правде", scores: { soc: -6 } },
        ]
    },
];
```

- [ ] **Step 2: Проверить в консоли браузера**

Открыть файл, в DevTools Console выполнить: `questions.length` — должно быть 24. Проверить, что у каждого вопроса ровно 4 варианта: `questions.every(q => q.options.length === 4)` — должно быть `true`.

- [ ] **Step 3: Commit**

```bash
git add quiz/index.html
git commit -m "feat: add 24 situational questions with scoring weights"
```

---

### Task 3: Движок теста (JS — навигация, подсчёт, переходы между экранами)

**Files:**
- Modify: `quiz/index.html` (секция `<script>`, после массива questions)

- [ ] **Step 1: Добавить JS-движок после массива questions**

```javascript
// --- State ---
let currentQuestion = 0;
let playerName = '';
const scores = { econ: 50, diplo: 50, gov: 50, soc: 50 };

// --- DOM ---
const screenWelcome = document.getElementById('screen-welcome');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const inputName = document.getElementById('input-name');
const btnStart = document.getElementById('btn-start');
const progressFill = document.getElementById('progress-fill');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const btnRestart = document.getElementById('btn-restart');

// --- Screen switching ---
function showScreen(screen) {
    screenWelcome.classList.remove('active');
    screenQuiz.classList.remove('active');
    screenResult.classList.remove('active');
    screen.classList.add('active');
    window.scrollTo(0, 0);
}

// --- Welcome ---
inputName.addEventListener('input', () => {
    btnStart.disabled = inputName.value.trim().length === 0;
});

btnStart.addEventListener('click', () => {
    playerName = inputName.value.trim();
    currentQuestion = 0;
    scores.econ = 50;
    scores.diplo = 50;
    scores.gov = 50;
    scores.soc = 50;
    showScreen(screenQuiz);
    renderQuestion();
});

// --- Quiz ---
function renderQuestion() {
    const q = questions[currentQuestion];
    progressFill.style.width = ((currentQuestion / questions.length) * 100) + '%';
    questionNumber.textContent = (currentQuestion + 1) + ' / ' + questions.length;
    questionText.textContent = q.text;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => selectOption(opt));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(opt) {
    // Apply scores
    for (const [axis, delta] of Object.entries(opt.scores)) {
        scores[axis] = Math.max(0, Math.min(100, scores[axis] + delta));
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

// --- Restart ---
btnRestart.addEventListener('click', () => {
    inputName.value = '';
    btnStart.disabled = true;
    showScreen(screenWelcome);
});
```

- [ ] **Step 2: Проверить в браузере**

Открыть файл, ввести имя, нажать "Поехали". Должны показываться вопросы один за другим, прогресс-бар двигаться. После 24-го вопроса ничего не произойдёт (showResult ещё не определена) — проверить в Console, что нет ошибок кроме "showResult is not defined".

- [ ] **Step 3: Commit**

```bash
git add quiz/index.html
git commit -m "feat: quiz engine - navigation, scoring, screen transitions"
```

---

### Task 4: Система типов + экран результата

16 базовых типов + логика определения типа + рендеринг результата с шкалами и кодом.

**Files:**
- Modify: `quiz/index.html` (секция `<script>`, после движка)

- [ ] **Step 1: Добавить типы и функцию showResult**

```javascript
// --- Types ---
// Key: "RLRL" = econ(R=Рынок/E=Равенство/C=Центр) + diplo(N=Нация/G=Глобализм/C=Центр) + gov(A=Авторитаризм/S=Свобода/C=Центр) + soc(T=Традиция/P=Прогресс/C=Центр)
const types = {
    'RNAT': { emoji: '🏰', name: 'Железный канцлер', desc: 'Порядок, скрепы, частная собственность. Бисмарк одобряет. Вы верите, что сильная рука и свободный рынок — не противоречие, а рецепт величия.' },
    'RNAP': { emoji: '🦅', name: 'Корпоративный орёл', desc: 'Деньги — ваши, страна — ваша, будущее — ваше. Прогресс через национальный капитал и жёсткую руку, направляющую его в нужное русло.' },
    'RNST': { emoji: '🤠', name: 'Фермер с ружьём', desc: 'Государство — в сторону, традиции — на стол, бизнес — мой. Как техасский ранчер, только, возможно, с дачей в Подмосковье.' },
    'RNSP': { emoji: '🏴', name: 'Национал-либертарианец', desc: 'Свои важнее, но государство пусть не лезет. Редкая порода: патриот, который терпеть не может чиновников.' },
    'RGAT': { emoji: '🎩', name: 'Имперский глобалист', desc: 'Открытые рынки, железная рука, проверенные ценности. Звучит как Британская империя на пике, и вам это нравится.' },
    'RGAP': { emoji: '📊', name: 'Технократ', desc: 'Данные, эффективность, глобальные рынки, прогресс. Эмоции — для тех, кто не умеет считать. У вас есть таблица на каждый случай жизни.' },
    'RGST': { emoji: '🎻', name: 'Аристократ-космополит', desc: 'Свобода, культура, открытый мир, но с уважением к корням. Вы бы неплохо смотрелись в венском кафе с газетой начала XX века.' },
    'RGSP': { emoji: '🚀', name: 'Кремниевый евангелист', desc: 'Uber для всего, блокчейн для остального, государство — помеха. Границы придумали бюрократы, будущее — за стартапами.' },
    'ENAT': { emoji: '⚒️', name: 'Народный трибун', desc: 'Всё наше, чужим не дадим, вождь знает лучше. Справедливость через силу, но только для своих.' },
    'ENAP': { emoji: '🔬', name: 'Госплановец 2.0', desc: 'Плановая экономика, но с ИИ и нейросетями. Государство знает лучше, наука подтверждает, нация — в приоритете.' },
    'ENST': { emoji: '🌾', name: 'Общинный патриот', desc: 'Деревня, община, взаимопомощь. Государство далеко, соседи — рядом. Чужих не надо, своих не бросаем.' },
    'ENSP': { emoji: '✊', name: 'Революционный националист', desc: 'Народ сам разберётся — без олигархов, без иностранцев. Свобода для своих, равенство между своими.' },
    'EGAT': { emoji: '🌐', name: 'Комиссар Земли', desc: 'Мировое правительство, справедливое распределение, строгий порядок. Утопия с большой буквы и большой палкой.' },
    'EGAP': { emoji: '🤖', name: 'Киберкоммунист', desc: 'ИИ распределяет ресурсы, границ нет, частной собственности нет. Маркс бы подписался, если бы понял, что такое блокчейн.' },
    'EGST': { emoji: '🕊️', name: 'Хранитель мира', desc: 'Равенство, свобода, глобальная солидарность, но с уважением к истории. Анархист с библиотечным билетом.' },
    'EGSP': { emoji: '🌈', name: 'Космический хиппи', desc: 'Границы — выдумка, собственность — иллюзия, будущее — за коммунами на Марсе. Вы прекрасны, но вас сложно пригласить на совещание.' },
};

function getAxisPole(value, highLabel, lowLabel, centerLabel) {
    if (value > 60) return highLabel;
    if (value < 40) return lowLabel;
    return centerLabel;
}

function getTypeKey() {
    const e = getAxisPole(scores.econ, 'R', 'E', 'C');
    const d = getAxisPole(scores.diplo, 'N', 'G', 'C');
    const g = getAxisPole(scores.gov, 'A', 'S', 'C');
    const s = getAxisPole(scores.soc, 'T', 'P', 'C');
    return e + d + g + s;
}

function findType(key) {
    // Exact match
    if (types[key]) return types[key];

    // If center on some axes, find closest match by replacing C with each pole
    // Try all combinations, pick first match
    const axes = key.split('');
    const centerIndices = axes.map((ch, i) => ch === 'C' ? i : -1).filter(i => i >= 0);

    if (centerIndices.length === 0) return types['RGSP']; // fallback

    const replacements = [
        [['R','E'], ['N','G'], ['A','S'], ['T','P']]
    ];

    // Generate all combinations replacing C
    function generate(arr, idx) {
        if (idx >= centerIndices.length) {
            const candidate = arr.join('');
            if (types[candidate]) return types[candidate];
            return null;
        }
        const pos = centerIndices[idx];
        const opts = pos === 0 ? ['R','E'] : pos === 1 ? ['N','G'] : pos === 2 ? ['A','S'] : ['T','P'];
        for (const o of opts) {
            arr[pos] = o;
            const result = generate([...arr], idx + 1);
            if (result) return result;
        }
        return null;
    }

    const result = generate([...axes], 0);
    return result || { emoji: '🎭', name: 'Абсолютный центрист', desc: 'Вы умудрились не занять ни одной позиции. Это либо мудрость, либо нерешительность. Возможно, и то и другое.' };
}

function getResultCode() {
    return Math.round(scores.econ) + '-' + Math.round(scores.diplo) + '-' + Math.round(scores.gov) + '-' + Math.round(scores.soc);
}

function showResult() {
    const key = getTypeKey();
    const type = findType(key);
    const code = getResultCode();

    document.getElementById('result-emoji').textContent = type.emoji;
    document.getElementById('result-type').textContent = type.name;
    document.getElementById('result-desc').textContent = type.desc;
    document.getElementById('result-code').textContent = code;

    // Axis markers
    document.getElementById('marker-econ').style.left = scores.econ + '%';
    document.getElementById('marker-diplo').style.left = scores.diplo + '%';
    document.getElementById('marker-gov').style.left = scores.gov + '%';
    document.getElementById('marker-soc').style.left = scores.soc + '%';

    // Copy code on click
    const codeEl = document.getElementById('result-code');
    codeEl.onclick = () => {
        navigator.clipboard.writeText(playerName + ': ' + code).then(() => {
            const hint = document.querySelector('.result-code-hint');
            hint.textContent = 'Скопировано!';
            setTimeout(() => { hint.textContent = 'Нажмите чтобы скопировать'; }, 2000);
        });
    };

    showScreen(screenResult);
}
```

- [ ] **Step 2: Полный прогон в браузере**

Открыть файл, ввести имя, пройти все 24 вопроса. На экране результата проверить:
- Тип-ярлык отображается с emoji
- Описание читаемо
- 4 шкалы с маркерами видны, маркеры в разных позициях
- Код результата отображается в формате `XX-XX-XX-XX`
- Клик по коду копирует в буфер
- Кнопка "Пройти заново" возвращает на экран приветствия

- [ ] **Step 3: Commit**

```bash
git add quiz/index.html
git commit -m "feat: 16 political types, result screen with axes and code"
```

---

### Task 5: Деплой на сервер

**Files:**
- `quiz/index.html` (загрузка на сервер)
- nginx config на сервере

- [ ] **Step 1: Создать директорию на сервере и загрузить файл**

```bash
ssh -i ~/.ssh/openclaw ruslan@72.56.108.79 "mkdir -p ~/quiz"
scp -i ~/.ssh/openclaw quiz/index.html ruslan@72.56.108.79:~/quiz/index.html
```

- [ ] **Step 2: Добавить location в nginx**

```bash
ssh -i ~/.ssh/openclaw ruslan@72.56.108.79 "sudo tee /etc/nginx/snippets/quiz.conf > /dev/null << 'NGINX'
location /quiz {
    alias /home/ruslan/quiz/;
    index index.html;
    try_files \$uri \$uri/ /quiz/index.html;
}
NGINX"
```

Затем включить сниппет в основной конфиг aristokrab.ru (внутри блока `server`):

```bash
ssh -i ~/.ssh/openclaw ruslan@72.56.108.79 "grep -q 'quiz.conf' /etc/nginx/sites-enabled/aristokrab.ru || sudo sed -i '/location \/budget/i\\    include snippets/quiz.conf;' /etc/nginx/sites-enabled/aristokrab.ru"
```

- [ ] **Step 3: Перезагрузить nginx и проверить**

```bash
ssh -i ~/.ssh/openclaw ruslan@72.56.108.79 "sudo nginx -t && sudo systemctl reload nginx"
```

Проверить: `curl -sI https://aristokrab.ru/quiz` — должен вернуть 200.

- [ ] **Step 4: Открыть в браузере на телефоне**

Открыть `https://aristokrab.ru/quiz` на мобильном устройстве. Проверить:
- Приветственный экран выглядит хорошо
- Ввод имени работает
- Вопросы удобно читать, варианты удобно тапать
- Результат отображается корректно
- Код копируется

- [ ] **Step 5: Commit (если были правки)**

```bash
git add quiz/index.html
git commit -m "fix: mobile adjustments after live testing"
```
