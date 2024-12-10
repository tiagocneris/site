import { getDb } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import type { Media } from '../types/database';

export const mediaRepository = {
  async createMedia(data: Omit<Media, 'id' | 'created_at' | 'updated_at'>) {
    const db = await getDb();
    const id = uuidv4();

    await db.run(
      `INSERT INTO media (id, user_id, type, url, title, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, data.user_id, data.type, data.url, data.title, data.description]
    );

    return this.getMediaById(id);
  },

  async getMediaById(id: string) {
    const db = await getDb();
    return db.get('SELECT * FROM media WHERE id = ?', [id]);
  },

  async getUserMedia(userId: string, type?: string) {
    const db = await getDb();
    let query = 'SELECT * FROM media WHERE user_id = ?';
    const params = [userId];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    return db.all(query, params);
  },

  async deleteMedia(id: string) {
    const db = await getDb();
    await db.run('DELETE FROM media WHERE id = ?', [id]);
  }
};