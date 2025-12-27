//  Supabase client Initializing

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ondprssalprffqjuxrlf.supabase.co";
// This key is from supabase project setting API keys (public)
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZHByc3NhbHByZmZxanV4cmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDcxMTAsImV4cCI6MjA3NDIyMzExMH0.9SfBNNGGZ5PgJKVbwbMmZ7KN7rLfk5Dk-hjOG_bZPuk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
