import {
  Boulder,
  BoulderGrade,
  BoulderGroup,
  BoulderGroupRaw,
  BoulderRaw,
  BoulderResponse,
  BoulderStart,
  BoulderStatus,
} from "@/lib/definitions";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./supabaseClient";

const supabase: SupabaseClient = createClient();

function fetchBoulderImagePublicUrl(image_url: string): string {
  return supabase.storage.from("boulder_images").getPublicUrl(image_url).data
    ?.publicUrl;
}

function mapBoulderResponse(data: BoulderResponse): Boulder {
  return {
    id: data.id,
    name: data.name,
    grade: data.grade as BoulderGrade,
    start: data.start as BoulderStart,
    description: data.description,
    longitude: data.longitude ?? null,
    latitude: data.latitude ?? null,
    first_ascender: data.first_ascender ?? null,
    first_ascent: data.first_ascent ? new Date(data.first_ascent) : null,
    // Boulder Group
    boulder_group_id: data.boulder_group_id ?? null,
    boulder_group_name: data.boulder_groups?.name ?? null,
    // Images
    image_base_url: data.image_base_url
      ? fetchBoulderImagePublicUrl(data.image_base_url)
      : null,
    image_line_url: data.image_line_url ?? null,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at: data.deleted_at ?? null,
    status: data.status as BoulderStatus,
  };
}

export async function fetchBoulders(): Promise<Boulder[]> {
  try {
    const { data, error }: PostgrestResponse<BoulderResponse> = await supabase
      .from("boulders")
      .select("*, boulder_groups(name)")
      .in("status", [BoulderStatus.CLIMBED, BoulderStatus.PROJECT]);

    console.log("DATA:", data);

    if (error) {
      throw error;
    }

    const boulders: Boulder[] = data.map((item) => mapBoulderResponse(item));

    return boulders;
  } catch (error) {
    console.error("Error fetching boulders", error);
    throw error;
  }
}

export async function fetchBoulderById(id: string) {
  try {
    const { data }: PostgrestResponse<BoulderResponse> = await supabase
      .from("boulders")
      .select("*, boulder_groups(name)")
      .eq("id", id);
    const boulder = data?.at(0);
    return boulder ? mapBoulderResponse(boulder) : null;
  } catch (error) {
    console.error("Error fetching boulder", error);
    throw error;
  }
}

// function mapBoulderGroup(data: BoulderGroup): BoulderGroup {
//   return {
//     id: data.id,
//     name: data.name,
//     description: data.description ?? null,
//     latitude: data.latitude ?? null,
//     longitude: data.longitude ?? null,
//   };
// }

export async function fetchBoulderGroups(): Promise<BoulderGroup[]> {
  try {
    const { data, error }: PostgrestResponse<BoulderGroup> = await supabase
      .from("boulder_groups")
      .select("*");
    if (error) {
      throw error;
    }

    // const boulder_groups: BoulderGroup[] = data.map((item: BoulderGroup) =>
    //   mapBoulderGroup(item)
    // );

    return data;
  } catch (error) {
    console.error("Error fetching boulder groups", error);
    throw error;
  }
}

export async function fetchBoulderGroupById(
  id: string
): Promise<BoulderGroup | null> {
  try {
    const { data }: PostgrestResponse<BoulderGroup> = await supabase
      .from("boulder_groups")
      .select("*")
      .eq("id", id);
    const boulderGroup = data?.at(0);
    return boulderGroup ?? null;
  } catch (error) {
    console.error("Error fetching boulder group", error);
    throw error;
  }
}

export async function fetchFilteredBoulderGroups(searchTerm: string) {
  try {
    const { data, error }: PostgrestResponse<BoulderGroup> = await supabase
      .from("boulder_groups")
      .select("*")
      .ilike("name", `%${searchTerm}%`);

    if (error) {
      throw error;
    }

    // const boulder_groups: BoulderGroup[] = data.map((item: BoulderGroup) =>
    //   mapBoulderGroup(item)
    // );

    return data;
  } catch (error) {
    console.error("Error fetching boulder group", error);
    throw error;
  }
}

export async function getOrCreateBoulderGroup(
  boulderGroup: BoulderGroupRaw
): Promise<string | null> {
  const { data, error } = await supabase
    .from("boulder_groups")
    .upsert(
      [
        {
          name: boulderGroup.name,
          description: boulderGroup.description ?? "",
        },
      ],
      { onConflict: "name" } // Ensures uniqueness
    )
    .select("id")
    .single(); // Fetches the row with the given name

  if (error) {
    console.error("Error upserting boulder group:", error);
    return null;
  }

  return data?.id;
}

export async function createBoulder(
  boulder: BoulderRaw
): Promise<string | null> {
  const { data, error } = await supabase
    .from("boulders")
    .insert([boulder])
    .select("id")
    .single();

  if (error) {
    console.error("Error creating boulder", error);
    throw error;
  }

  return data?.id;
}

export async function updateBoulder(id: string, boulder: BoulderRaw) {
  const { data, error } = await supabase
    .from("boulders")
    .update(boulder)
    .eq("id", id);

  if (error) {
    console.error("Error updating boulder", error);
    throw error;
  }

  return data;
}

export async function isBoulderAdmin(userId: string) {
  const { data, error } = await supabase
    .from("boulder_admins")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error checking admin status:", error);
    return false;
  }

  return !!data; // Returns true if user is found
}
