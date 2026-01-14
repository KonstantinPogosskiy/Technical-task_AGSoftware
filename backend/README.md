# Task Manager Backend
Backend API для управления

# Инструмент
Nest.js, TypeScript, PostgreSQL, Sequelize.

## Установка
npm install
```

`.env`
```
PORT=3001
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=postgres
DB_USER=postgres
DB_PASSWORD=postgres
```


Запуск:
```
npm run dev

## API Endpoints
- `GET /tasks?page=1&limit=10&search=...` - Получить список задач с пагинацией и поиском
- `POST /tasks` - Создать задачу
- `PUT /tasks/:id` - Обновить задачу
- `DELETE /tasks/:id` - Удалить задачу
