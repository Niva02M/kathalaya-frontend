import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI!;
const options = {};

if (!global.mongoClient) {
  global.mongoClient = new MongoClient(uri, options);
}

const client = global.mongoClient;

export default client;
