import { supabase } from './supabase';

export const initDb = async () => {
  // Create tables if they don't exist
  const { error } = await supabase.rpc('init_database');
  if (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDb = () => supabase;