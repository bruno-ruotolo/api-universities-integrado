import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export let db: Db = null;
export let mongoClient: MongoClient = null;

try {
  mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  db = mongoClient.db(process.env.MONGO_DB_NAME);

  console.log("Data Base ON");
} catch (e) {
  console.log("Data Base OFF", e);
}
