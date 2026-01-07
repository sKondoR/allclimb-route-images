import 'reflect-metadata';
import { Place } from '../models/Place';
import { Region } from '../models/Region';
import { Route } from '../models/Route';
import { Sector } from '../models/Sector';
import { Settings } from '../models/Settings';
import { Image } from '../models/Image';
import { DataSource } from 'typeorm';
import type { ObjectLiteral } from 'typeorm';

let AppDataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (AppDataSource?.isInitialized) {
    return AppDataSource;
  }

  try {
    AppDataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT) | 5432,
        url: process.env.POSTGRES_URL,
        database: process.env.POSTGRES_DB_NAME,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [
          Settings,
          Region,
          Place,
          Sector,
          Route,
          Image,
        ],
        synchronize: process.env.NODE_ENV === 'development',
        logging: process.env.NODE_ENV === 'development',
        logger: 'simple-console',
        ssl: process.env.NODE_ENV === 'production' ? { 
          rejectUnauthorized: false 
        } : false,
        extra: {
          max: 1, // Important for serverless
          connectionTimeoutMillis: 5000,
        }
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // ssl: process.env.NODE_ENV === 'production',
    });

    await AppDataSource.initialize().catch((err) => {
      console.error('Data source initialization failed', err)
      process.exit(1)
    });
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
