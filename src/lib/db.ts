// src/lib/db.ts
import Database from 'better-sqlite3';

const dbPath = './mydb.db';
const db = new Database(dbPath);

function columnExists(db: Database.Database, tableName: string, columnName: string): boolean {
  const result = db.prepare(`
    SELECT COUNT(*) AS count
    FROM pragma_table_info('${tableName}')
    WHERE name = '${columnName}'
  `).get();
  return result.count > 0;
}

db.exec(`
  CREATE TABLE IF NOT EXISTS clothing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    color TEXT,
    image TEXT
  );
`);


if (!columnExists(db, 'clothing', 'user_id')) {
  db.exec(`ALTER TABLE clothing ADD COLUMN user_id TEXT;`);
  console.log("Added user_id column to clothing table");
}

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

if (!columnExists(db, 'outfits', 'user_id')) {
  db.exec(`ALTER TABLE outfits ADD COLUMN user_id TEXT;`);
  console.log("Added user_id column to outfits table");
}

db.exec(`
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS outfit_tags (
    outfit_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (outfit_id, tag_id),
    FOREIGN KEY (outfit_id) REFERENCES outfits(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
  );
`);

export default db;