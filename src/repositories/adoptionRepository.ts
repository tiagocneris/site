import { getDb } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export const adoptionRepository = {
  async createAdoptionFair(data: {
    ongId: string;
    name: string;
    date: string;
    time: string;
    location: string;
    address: string;
    description?: string;
    imageUrl?: string;
  }) {
    const db = await getDb();
    const id = uuidv4();

    await db.run(
      `INSERT INTO adoption_fairs (
        id, ong_id, name, date, time, location, address, description, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, data.ongId, data.name, data.date, data.time, data.location, 
       data.address, data.description, data.imageUrl]
    );

    return this.getAdoptionFairById(id);
  },

  async getAdoptionFairById(id: string) {
    const db = await getDb();
    const fair = await db.get(
      `SELECT af.*, u.name as ong_name, u.email as ong_email
       FROM adoption_fairs af
       JOIN users u ON af.ong_id = u.id
       WHERE af.id = ?`,
      [id]
    );

    if (fair) {
      const animals = await db.all(
        'SELECT * FROM animals WHERE fair_id = ?',
        [id]
      );
      return { ...fair, animals };
    }

    return null;
  },

  async getAdoptionFairs(filters?: {
    status?: string;
    ongId?: string;
    fromDate?: string;
    toDate?: string;
  }) {
    const db = await getDb();
    let query = `
      SELECT af.*, u.name as ong_name, u.email as ong_email
      FROM adoption_fairs af
      JOIN users u ON af.ong_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters?.status) {
      query += ' AND af.status = ?';
      params.push(filters.status);
    }

    if (filters?.ongId) {
      query += ' AND af.ong_id = ?';
      params.push(filters.ongId);
    }

    if (filters?.fromDate) {
      query += ' AND af.date >= ?';
      params.push(filters.fromDate);
    }

    if (filters?.toDate) {
      query += ' AND af.date <= ?';
      params.push(filters.toDate);
    }

    query += ' ORDER BY af.date ASC';

    const fairs = await db.all(query, params);

    // Get animals for each fair
    for (const fair of fairs) {
      fair.animals = await db.all(
        'SELECT * FROM animals WHERE fair_id = ?',
        [fair.id]
      );
    }

    return fairs;
  },

  async updateAdoptionFair(id: string, data: any) {
    const db = await getDb();
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    await db.run(
      `UPDATE adoption_fairs 
       SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [...Object.values(data), id]
    );

    return this.getAdoptionFairById(id);
  }
};