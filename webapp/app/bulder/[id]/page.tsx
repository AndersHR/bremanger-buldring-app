import styles from "@/app/page.module.css";
import { fetchBoulderById } from "@/app/lib/supabase/data";
import { BoulderCard } from "@/app/ui/boulderCard";

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const boulder = await fetchBoulderById(params.id)

  return (
    <div className={styles.page}>
      <div className={styles.feed}>
        <BoulderCard boulder={boulder} />
      </div>
    </div>
  )
}