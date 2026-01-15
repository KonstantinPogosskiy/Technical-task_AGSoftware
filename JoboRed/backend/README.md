# JoboRed Backend
http://localhost:3001

# Инструмент
Nest.js, TypeScript, PostgreSQL, Sequelize.

## Установка
```bash
npm install
```

## Переменные `.env`
```bash
PORT=3001
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jobored
DB_USER=postgres
DB_USER=postgres
DB_PASSWORD=postgres
```

## Запуск:
```bash
npm run dev
```

## API Endpoints
```bash
- `GET /vacancies` - Получить список вакансий
- `GET /vacancies/:id` - Получить вакансию по ID
- `GET /favorites` - Получить список избранных вакансий
- `POST /favorites` - Добавить вакансию в избранное (body: { vacancyId: number })
- `DELETE /favorites/:id` - Удалить из избранного по ID
```