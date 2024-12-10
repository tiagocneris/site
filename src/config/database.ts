import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db: any = null;

export async function initializeDatabase() {
  if (db) return db;
  
  db = await open({
    filename: ':memory:', // Using in-memory database for WebContainer
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      avatar TEXT,
      role TEXT DEFAULT 'USER',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      notifications BOOLEAN DEFAULT true,
      email_updates BOOLEAN DEFAULT true,
      language TEXT DEFAULT 'pt-BR',
      theme TEXT DEFAULT 'light',
      privacy_enabled BOOLEAN DEFAULT true,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS delivery_partners (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      vehicle_type TEXT NOT NULL,
      license_plate TEXT NOT NULL,
      documents TEXT NOT NULL,
      status TEXT DEFAULT 'PENDING',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      url TEXT NOT NULL,
      title TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS adoption_fairs (
      id TEXT PRIMARY KEY,
      ong_id TEXT NOT NULL,
      name TEXT NOT NULL,
      date DATETIME NOT NULL,
      time TEXT NOT NULL,
      location TEXT NOT NULL,
      address TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      status TEXT DEFAULT 'PENDING',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ong_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS animals (
      id TEXT PRIMARY KEY,
      fair_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      breed TEXT NOT NULL,
      age TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (fair_id) REFERENCES adoption_fairs(id)
    );
  `);

  return db;
}

export async function getDb() {
  if (!db) {
    db = await initializeDatabase();
  }
  return db;
}