// src/lib/db.ts
import Database from 'better-sqlite3';

const dbPath = './mydb.db'; // Or an absolute path if needed
const db = new Database(dbPath);

// Initialize the clothing table
db.exec(`
  CREATE TABLE IF NOT EXISTS clothing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT,
    image TEXT
  );
`);

// Initialize the outfits table
db.exec(`
  CREATE TABLE IF NOT EXISTS outfits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    top_id INTEGER NOT NULL,
    bottom_id INTEGER NOT NULL,
    shoe_id INTEGER NOT NULL,
    tags TEXT DEFAULT '',
    FOREIGN KEY (top_id) REFERENCES clothing(id),
    FOREIGN KEY (bottom_id) REFERENCES clothing(id),
    FOREIGN KEY (shoe_id) REFERENCES clothing(id)
  );
`);

export default db;