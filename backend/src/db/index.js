import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Keep the crash early + obvious in dev.
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_*_KEY in environment variables"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;