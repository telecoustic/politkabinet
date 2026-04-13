Покажи аналитику Политкабинета за последние 7 дней.

Используй Яндекс.Метрику API:
- Счётчик: 108526234
- Токен: y0__xDIzMG-AhjsqUAg86POiRcVy1J3W4WgtsxQvuXSepmDYMIWFA
- Base URL: https://api-metrika.yandex.net/stat/v1/data

Запроси и покажи:

1. **Обзор**: визиты, пользователи, просмотры страниц
   `metrics=ym:s:visits,ym:s:users,ym:s:pageviews`

2. **По дням**: визиты по дням
   `dimensions=ym:s:date&metrics=ym:s:visits&sort=ym:s:date`

3. **Источники трафика**:
   `dimensions=ym:s:lastTrafficSource&metrics=ym:s:visits&sort=-ym:s:visits`

4. **Устройства**:
   `dimensions=ym:s:deviceCategory&metrics=ym:s:visits`

5. **Страницы**:
   `dimensions=ym:s:startURL&metrics=ym:s:visits&sort=-ym:s:visits&limit=10`

6. **Цели (если есть данные)**:
   Проверь достижение целей: cta_click, quiz_start, quiz_complete, share_click, compare_click

Формат вывода: таблицы с числами, краткий вывод "что это значит".
Период: date1=today-7d, date2=today.
