import { getDb } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import type { DeliveryPartner } from '../types/database';

export const deliveryRepository = {
  async createDeliveryPartner(data: Omit<DeliveryPartner, 'id' | 'created_at' | 'updated_at'>) {
    const db = await getDb();
    const id = uuidv4();

    await db.run(
      `INSERT INTO delivery_partners (id, user_id, cpf, vehicle_type, license_plate, documents)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, data.user_id, data.cpf, data.vehicle_type, data.license_plate, data.documents]
    );

    return this.getDeliveryPartnerById(id);
  },

  async getDeliveryPartnerById(id: string) {
    const db = await getDb();
    return db.get(
      `SELECT dp.*, u.name as user_name, u.email as user_email
       FROM delivery_partners dp
       JOIN users u ON dp.user_id = u.id
       WHERE dp.id = ?`,
      [id]
    );
  },

  async getDeliveryPartnerByUserId(userId: string) {
    const db = await getDb();
    return db.get(
      `SELECT dp.*, u.name as user_name, u.email as user_email
       FROM delivery_partners dp
       JOIN users u ON dp.user_id = u.id
       WHERE dp.user_id = ?`,
      [userId]
    );
  },

  async updateDeliveryPartner(id: string, data: Partial<DeliveryPartner>) {
    const db = await getDb();
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    await db.run(
      `UPDATE delivery_partners 
       SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [...Object.values(data), id]
    );

    return this.getDeliveryPartnerById(id);
  }
};