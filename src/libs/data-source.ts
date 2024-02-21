import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let dbConnection: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (dbConnection) {
    return dbConnection; // Reuse existing connection
  }

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error('MongoDB connection string missing');
  }

  const client = await MongoClient.connect(connectionString);
  dbConnection = client.db(process.env.MONGODB_DATABASE_NAME);
  return dbConnection;
};

export const getDb = (): Db => {
  if (!dbConnection) {
    throw new Error('Database not connected!');
  }
  return dbConnection;
};