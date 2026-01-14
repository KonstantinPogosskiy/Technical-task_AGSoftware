export default () => (
  {
    port: 3000,
    database: {
      dialect: process.env.DB_DIALECT || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      password: process.env.DB_PASSWORD || 'postgres',
      db: process.env.DB_NAME || 'taskmanager',
      user: process.env.DB_USER || 'postgres',
    },
  }
);