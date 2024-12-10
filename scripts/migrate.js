import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function runMigrations() {
  try {
    // Read and execute migrations in order
    const migrations = [
      '00001_initial_schema.sql',
      '00002_storage_buckets.sql'
    ];

    for (const migration of migrations) {
      console.log(`Running migration: ${migration}`);
      const sql = readFileSync(join(__dirname, '../src/migrations', migration), 'utf8');
      const { error } = await supabase.rpc('exec_sql', { sql });
      
      if (error) {
        throw error;
      }
    }

    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();