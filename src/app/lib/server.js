import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const ANON = process.env.NEXT_PUBLIC_ANON_KEY;

export const supabase = createClient(URL, ANON);
