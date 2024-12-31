import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function setupDatabase() {
  const { error } = await supabase
    .from('crypto_news')
    .select('id')
    .limit(1);

  if (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
  
  console.log('Database connected successfully');
}