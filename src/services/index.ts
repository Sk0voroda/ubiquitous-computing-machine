import { createClient } from '@supabase/supabase-js';

// TODO: move to env
const supabaseUrl = 'https://rfxpaljcpdraorcijdbv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeHBhbGpjcGRyYW9yY2lqZGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwMjk4ODcsImV4cCI6MTk5MTYwNTg4N30.rbZadzenK0OQl1KOKDJBxOwIShPz0AT4w2C4kkvjK3s';

export const supabase = createClient(supabaseUrl, supabaseKey);

// const COLLECTIONS = {
//   TODOS: 'todos',
//   USERS: 'users',
// } as const;

// type Collections = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
