```javascript
import { getDb } from '../src/lib/db.js';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  try {
    const db = await getDb();

    // Create sample users
    const users = [
      {
        id: uuidv4(),
        email: 'user@example.com',
        name: 'John Doe',
        password: 'password123',
        role: 'USER'
      },
      {
        id: uuidv4(),
        email: 'ong@example.com',
        name: 'ONG Amigos dos Pets',
        password: 'password123',
        role: 'ONG'
      }
    ];

    for (const user of users) {
      await db.run(`
        INSERT INTO users (id, email, name, password, role)
        VALUES (?, ?, ?, ?, ?)
      `, [user.id, user.email, user.name, user.password, user.role]);

      await db.run(`
        INSERT INTO settings (id, user_id)
        VALUES (?, ?)
      `, [uuidv4(), user.id]);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();
```