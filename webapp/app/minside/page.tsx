import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>Hei {data.user.email}!</p>
      <p>Min Side er enda ikke implementert</p>
    </div>
  );
}
