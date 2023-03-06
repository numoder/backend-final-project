import { MongoClient } from "mongodb";
import { mongoCredentials } from "../secrets.js";

export function dbConnect() {
  const client = new MongoClient(mongoCredentials.URI)
  return client.db(mongoCredentials.DB)
}
