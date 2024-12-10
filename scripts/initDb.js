import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = 'https://lvuxkokalxnuxzlqmywo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dXhrb2thbHhudXh6bHFteXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTc2MTUsImV4cCI6MjA0ODY3MzYxNX0.JlJA_z2BVaCCDHVaVNhR6e4ZFqckbQioGQ8I2uLUW1o';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function initDatabase() {
  try {
    // Create functions first
    const functionsSql = readFileSync(join(__dirname, '../src/migrations/00000_functions.sql'), 'utf8');
    await supabase.rpc('exec_sql', { sql: functionsSql });
    console.log('Functions created successfully');

    // Create tables and initialize database
    const initSql = readFileSync(join(__dirname, '../src/migrations/00001_init_database.sql'), 'utf8');
    await supabase.rpc('exec_sql', { sql: initSql });
    console.log('Tables created successfully');

    // Run initialization function
    await supabase.rpc('init_database');
    console.log('Database initialized successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();