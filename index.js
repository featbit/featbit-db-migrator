import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { Client } from 'pg'
import { Migrator } from './migrator.js'

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING
const pgConnectionString = process.env.POSTGRES_CONNECTION_STRING

if (!mongoConnectionString) {
  console.error('Error: MONGODB_CONNECTION_STRING is not set in the environment variables.')
  process.exit(1)
}

let mongoClient;

try {
  mongoClient = new MongoClient(mongoConnectionString);
  await mongoClient.connect();

  mongoClient.db().collection('admin').find()

  // Send a ping to confirm a successful connection
  await mongoClient.db('admin').command({ ping: 1 });

  console.log('Successfully connected to MongoDB.');
} catch (error) {
  console.error('Failed to connect to MongoDB:', error)
  process.exit(1)
}

if (!pgConnectionString) {
  console.error('Error: POSTGRES_CONNECTION_STRING is not set in the environment variables.')
  process.exit(1)
}

let pgClient;
try {
  pgClient = new Client({
    connectionString: pgConnectionString,
  });
  await pgClient.connect();
  await pgClient.query('SELECT 1');

  console.log('Successfully connected to PostgreSQL.');
} catch (error) {
  console.error('Failed to connect to PostgreSQL:', error)
  process.exit(1)
}

const migrator = new Migrator(mongoClient, pgClient);

try {
  console.log('Starting migration process...');

  await migrator.generate_csv();

  console.log('CSV generation completed successfully.');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

// Close the connections when done
await mongoClient.close();
await pgClient.end();

console.log('Connections closed.');