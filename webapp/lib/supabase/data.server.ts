import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./serverClient";

const supabase: SupabaseClient = await createClient();

export async function fetchIsAdmin() {
  return await supabase.rpc("is_boulder_admin");
}
