import db from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export const userService = {
  createUser(data: {
    email: string;
    name: string;
    password: string;
    phone?: string;
    address?: string;
  }) {
    const userId = uuidv4();
    const settingsId = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO users (id, email, name, password, phone, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const settingsStmt = db.prepare(`
      INSERT INTO settings (id, user_id)
      VALUES (?, ?)
    `);

    db.transaction(() => {
      stmt.run(userId, data.email, data.name, data.password, data.phone, data.address);
      settingsStmt.run(settingsId, userId);
    })();

    return this.getUserById(userId);
  },

  updateUser(id: string, data: any) {
    const stmt = db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          address = COALESCE(?, address),
          avatar = COALESCE(?, avatar),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(data.name, data.email, data.phone, data.address, data.avatar, id);
    return this.getUserById(id);
  },

  getUserById(id: string) {
    const stmt = db.prepare(`
      SELECT u.*, s.*
      FROM users u
      LEFT JOIN settings s ON u.id = s.user_id
      WHERE u.id = ?
    `);

    return stmt.get(id);
  },

  getUserByEmail(email: string) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }
};