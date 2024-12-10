import { getDb } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import type { User, Settings } from '../types/database';

export const userRepository = {
  async createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const db = await getDb();
    const userId = uuidv4();
    const settingsId = uuidv4();

    await db.run(
      `INSERT INTO users (id, email, name, password, phone, address, role)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, data.email, data.name, data.password, data.phone, data.address, data.role]
    );

    await db.run(
      `INSERT INTO settings (id, user_id)
       VALUES (?, ?)`,
      [settingsId, userId]
    );

    return this.getUserById(userId);
  },

  async getUserById(id: string) {
    const db = await getDb();
    return db.get(
      `SELECT u.*, s.*
       FROM users u
       LEFT JOIN settings s ON u.id = s.user_id
       WHERE u.id = ?`,
      [id]
    );
  },

  async getUserByEmail(email: string) {
    const db = await getDb();
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  },

  async updateUser(id: string, data: Partial<User>) {
    const db = await getDb();
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    await db.run(
      `UPDATE users 
       SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [...Object.values(data), id]
    );

    return this.getUserById(id);
  },

  async updateSettings(userId: string, data: Partial<Settings>) {
    const db = await getDb();
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    await db.run(
      `UPDATE settings 
       SET ${fields}
       WHERE user_id = ?`,
      [...Object.values(data), userId]
    );

    return this.getUserById(userId);
  }
};