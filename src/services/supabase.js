import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dbafxcvrwjbyeulkunmo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYWZ4Y3Zyd2pieWV1bGt1bm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNjI1MDQsImV4cCI6MjAwNTgzODUwNH0.SWPTrimsDsDuxd_ZzTgWSVUrU6BHg_6X2k1kdMTOUKw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
