import { Client, config } from "../deps.ts";
const env = config();
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  password: "mySql@8",
  db: "demo",
  // hostname: env.APP_DB_HOSTNAME,
  // username: env.APP_DB_USERNAME,
  // password: env.APP_DB_PASSWORD,
  // db: env.APP_DB_DATABASE,

  // db:'demo', // optional you can directly create database from below command without passing the db name
});

// await client.execute(`CREATE DATABASE IF NOT EXISTS demo`);
// await client.execute(`USE demo`);
export default client;
