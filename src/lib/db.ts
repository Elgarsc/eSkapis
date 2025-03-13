// src/lib/db.ts
import Database from 'better-sqlite3';

const dbPath = './mydb.db';
const db = new Database(dbPath);

// Function to check if a column exists in a table
function columnExists(db: Database.Database, tableName: string, columnName: string): boolean {
  const result = db.prepare(`
    SELECT COUNT(*) AS count
    FROM pragma_table_info('${tableName}')
    WHERE name = '${columnName}'
  `).get();
  return result.count > 0;
}

// Create clothing table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS clothing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT,
    image TEXT
  );
`);

// Add user_id column to clothing table if it doesn't exist
if (!columnExists(db, 'clothing', 'user_id')) {
  db.exec(`ALTER TABLE clothing ADD COLUMN user_id TEXT;`);
  console.log("Added user_id column to clothing table");
}

// Create outfits table if it doesn't exist
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

// Add user_id column to outfits table if it doesn't exist
if (!columnExists(db, 'outfits', 'user_id')) {
  db.exec(`ALTER TABLE outfits ADD COLUMN user_id TEXT;`);
  console.log("Added user_id column to outfits table");
}

export default db;