"use server";

import Header from "./Header";
import { createClient } from "@/lib/supabase/server";

export default async function HeaderWrapper() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) console.error(error);

  return <Header userData={data.user} />;
}
