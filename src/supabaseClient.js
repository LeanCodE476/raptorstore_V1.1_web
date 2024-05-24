import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://hzwctsfqzutnhgrwfwgc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6d2N0c2ZxenV0bmhncndmd2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MjM1MDIsImV4cCI6MjAzMTk5OTUwMn0.2nZ1nbd5juiYq6SOMpJ2tZSj8JSepukBaIGQ5p72d9E";

export const supabase = createClient(supabaseURL, supabaseAnonKey);
