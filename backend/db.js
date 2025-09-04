import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent DB path for Render (or local fallback)
const dbPath = process.env.RENDER
  ? "/opt/render/project/data/users.db"
  : path.join(__dirname, "users.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database:", dbPath);

    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      )`
    );
  }
});

export default db;
