import 'reflect-metadata';
import { DataSource } from 'typeorm';
import type { ObjectLiteral } from 'typeorm';

import { Settings } from '../models/Settings.entity';
import { Region } from '../models/Region.entity';
import { Place } from '../models/Place.entity';
import { Sector } from '../models/Sector.entity';
import { Route } from '../models/Route.entity';
import { Image } from '../models/Image.entity';

let AppDataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (AppDataSource?.isInitialized) {
    return AppDataSource;
  }
  const isProd = process.env.NODE_ENV === 'production';
  try {
    console.log(__dirname);
    AppDataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT) || 5432,
        url: process.env.POSTGRES_URL,
        database: process.env.POSTGRES_DB_NAME,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [Region, Place, Sector, Route, Image, Settings],
        synchronize: !isProd,
        logging: !isProd,
        logger: 'simple-console',
        ssl: isProd ? { 
          rejectUnauthorized: false 
        } : false,
        extra: {
          max: 1, // Important for serverless
          connectionLimit: 10,
          idleTimeoutMillis: 600000, // Время ожидания бездействия перед закрытием соединения
          connectionTimeoutMillis: 20000, // Таймаут подключения к базе данных
        }
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // ssl: process.env.NODE_ENV === 'production',
    });

    await AppDataSource.initialize().catch((err) => {
      console.error('Data source initialization failed', err)
      process.exit(1)
    });

    console.log('Registered entities:', AppDataSource.entityMetadatas.map(e => e.name));
    console.log('Database connected successfully');
    return AppDataSource;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

// For Vercel serverless functions, initialize on demand
export async function getDatabase() {
  const dataSource = await getDataSource();
  // dataSource.dropDatabase();
  // await dataSource.synchronize(true);
  return {
    dataSource,
    getRepository: <T extends ObjectLiteral>(entity: new () => T) => {
      return dataSource.getRepository<T>(entity);
    },
  };
}

export async function closeDataSource() {
  if (AppDataSource?.isInitialized) {
    await AppDataSource.destroy();
    AppDataSource = null;
  }
}
