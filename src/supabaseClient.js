import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://svnjpqwdllvxjvafctta.supabase.co"; // Replace with your Supabase project URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bmpwcXdkbGx2eGp2YWZjdHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzMxODEsImV4cCI6MjA1Mjc0OTE4MX0.cZQskYHrFlnTjsgpmGTwsXtM7GWszAPpD2rf-X60HvA"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
