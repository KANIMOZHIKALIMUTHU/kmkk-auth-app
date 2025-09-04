import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error("DB connection failed:", err.message);
  else console.log("✅ Connected to SQLite DB");
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`
);

export default db;
