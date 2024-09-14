import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const dataSource = new DataSource({
  name: 'budgeting-db',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
export default dataSource;
