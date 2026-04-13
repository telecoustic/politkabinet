# Политкабинет

Бесплатный тест политических взглядов. 24 бытовые ситуации, 4 оси, 16 типов. Сравнение с друзьями через ссылку.

**Живой сайт:** https://politkabinet.ru
**Репо:** https://github.com/telecoustic/politkabinet

## Как это работает

1. Пользователь заходит на лендинг, вводит имя, начинает тест
2. 24 ситуационных вопроса (порядок рандомизирован)
3. Получает тип из 16 + описание + 4 шкалы + код результата
4. Кнопка "Поделиться" → ссылка `/t/XX-XX-XX-XX`
5. Друг проходит тест по ссылке → вводит код → видит сравнение

## Модель

| Ось | 0 | 100 |
|---|---|---|
| Экономика | Солидарность | Инициатива |
| Дипломатия | Открытость | Суверенитет |
| Государство | Автономия | Порядок |
| Общество | Обновление | Преемственность |

Каждый вопрос измеряет строго одну ось. 4 ответа = 4 позиции на шкале.

## Стек

- **Next.js 16** + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Docker** (standalone build)
- **Nginx** reverse proxy + SSL (Let's Encrypt)
- **Яндекс.Метрика** (счётчик 108526234, кастомные события)

## Структура

```
app/                         Next.js приложение
├── src/app/
│   ├── page.tsx             Лендинг
│   ├── quiz/page.tsx        Страница теста
│   └── t/[code]/page.tsx    Роут для ссылки шаринга
├── src/components/
│   ├── landing/             Секции лендинга (8 штук)
│   ├── quiz/                Quiz flow + результат + сравнение
│   └── ui/                  shadcn компоненты
├── src/lib/
│   ├── questions.ts         24 вопроса (типизированные)
│   ├── types.ts             16 типов + логика определения
│   ├── comparison-texts.ts  Шаблоны для сравнения
│   ├── analytics.ts         Яндекс.Метрика events
│   └── utils.ts
├── Dockerfile
├── docker-compose.yml
└── public/favicon.svg

PRD.md                       Product Requirements Document
ajtbd-analysis.md            AJTBD-анализ (5 сегментов, граф работ)
pricing-strategy.md          Стратегия ценообразования (Талер)
market-research.md           Конкуренты, тренды, отстройка
archive/                     Legacy файлы (HTML-прототипы, старые спеки)
```

## Деплой

```bash
# Через slash-команду в Claude Code:
/deploy

# Или вручную:
cd app && npm run build
rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.git' \
  -e "ssh -i ~/.ssh/ruvds" app/ root@144.31.216.63:/opt/politkabinet/
ssh -i ~/.ssh/ruvds root@144.31.216.63 \
  "cd /opt/politkabinet && docker compose up -d --build"
```

Сервер: 144.31.216.63, домен: politkabinet.ru, SSL автообновление.

## Аналитика

Яндекс.Метрика + кастомные события воронки:
- `cta_click` → `quiz_start` → `quiz_q` (1-24) → `quiz_complete`
- `share_click` → `share_copy`
- `friend_code_enter` → `compare_click`

```bash
# Через slash-команду:
/analytics
```

## Контекст

Проект создан в рамках BOOST-интенсива по вайб-кодингу (boost-intensive.ru).
Все воркшопы (0-6) пройдены. Подробности — в CLAUDE.md.
