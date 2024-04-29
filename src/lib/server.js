import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const ANON = process.env.NEXT_PUBLIC_ANON_KEY;
const SERVICEKEY = process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY;
export const supabase = createClient(URL, ANON);
export const supabaseAdmin = createClient(URL, SERVICEKEY);
