import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvuxkokalxnuxzlqmywo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dXhrb2thbHhudXh6bHFteXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTc2MTUsImV4cCI6MjA0ODY3MzYxNX0.JlJA_z2BVaCCDHVaVNhR6e4ZFqckbQioGQ8I2uLUW1o';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdminUser() {
  try {
    // Create auth user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email: 'tiagoneris13@gmail.com',
      password: '140515Luis@',
      options: {
        data: {
          name: 'admestre',
          role: 'ADMIN'
        }
      }
    });

    if (signUpError) throw signUpError;
    console.log('Auth user created successfully');

    if (!user) throw new Error('No user returned from signUp');

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: 'tiagoneris13@gmail.com',
        name: 'admestre',
        role: 'ADMIN'
      });

    if (profileError) throw profileError;
    console.log('User profile created successfully');

    // Create user settings
    const { error: settingsError } = await supabase
      .from('settings')
      .insert({
        user_id: user.id,
        notifications: true,
        email_updates: true,
        language: 'pt-BR',
        theme: 'light',
        privacy_enabled: true
      });

    if (settingsError) throw settingsError;
    console.log('User settings created successfully');

    console.log('Admin user created successfully!');
    console.log('Please check your email to confirm your account.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();