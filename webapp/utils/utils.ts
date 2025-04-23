import { Boulder, BoulderGroup } from "@/lib/definitions";
import { fetchBoulderImagePublicUrl } from "@/lib/supabase/data.client";

export const formatDate = (date?: Date | null): string | null => {
  return date ? date.toISOString().split("T")[0] : null;
};

export function getBoulderGroupImageUrl(
  boulderGroup: BoulderGroup,
  boulders: Boulder[]
): string {
  return boulderGroup.image_url
    ? fetchBoulderImagePublicUrl(boulderGroup.image_url, "bouldergroupimages")
    : boulders[0]?.image_base_url
    ? fetchBoulderImagePublicUrl(boulders[0].image_base_url, "boulder_images")
    : "";
}
