import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./serverClient";

export async function fetchIsAdmin() {
  const supabase: SupabaseClient = await createClient();
  return await supabase.rpc("is_boulder_admin");
}
