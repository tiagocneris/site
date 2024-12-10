import { supabase } from '../lib/supabase';

async function createAdminUser() {
  try {
    // Create user with email and password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'tiagoneris13@gmail.com',
      password: '140515Luis@',
      options: {
        data: {
          name: 'admestre',
          role: 'ADMIN'
        }
      }
    });

    if (authError) throw authError;

    // Create user profile in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        email: 'tiagoneris13@gmail.com',
        name: 'admestre',
        role: 'ADMIN'
      });

    if (profileError) throw profileError;

    // Create settings for the user
    const { error: settingsError } = await supabase
      .from('settings')
      .insert({
        user_id: authData.user?.id,
        notifications: true,
        email_updates: true,
        language: 'pt-BR',
        theme: 'light',
        privacy_enabled: true
      });

    if (settingsError) throw settingsError;

    console.log('Admin user created successfully!');
    return authData.user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

createAdminUser();