Задеплой Политкабинет на сервер.

Шаги:
1. Собери билд: `cd app && npm run build` — убедись, что нет ошибок
2. Залей файлы: `rsync -avz --exclude='node_modules' --exclude='.next' --exclude='.git' -e "ssh -i ~/.ssh/ruvds" app/ root@144.31.216.63:/opt/politkabinet/`
3. Пересобери контейнер: `ssh -i ~/.ssh/ruvds root@144.31.216.63 "cd /opt/politkabinet && docker compose up -d --build"`
4. Проверь, что сайт отвечает: `ssh -i ~/.ssh/ruvds root@144.31.216.63 "curl -s -o /dev/null -w '%{http_code}' http://localhost:3100"`
5. Сообщи результат: билд ок/ошибка, деплой ок/ошибка, HTTP-статус

Сервер: 144.31.216.63, SSH-ключ: ~/.ssh/ruvds, пользователь: root
Контейнер: politkabinet, порт 3100, nginx reverse proxy → politkabinet.ru
