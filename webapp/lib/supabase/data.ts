import { PostgrestResponse } from "@supabase/supabase-js";
import { createClient } from "./supabaseClient";
import {
  Boulder,
  BoulderGrade,
  BoulderStatus,
  BoulderStart,
  BoulderGroup,
  BoulderRaw,
} from "@/lib/definitions";

const supabase = createClient();

function fetchBoulderImagePublicUrl(image_url: string) {
  return supabase.storage.from("boulder_images").getPublicUrl(image_url).data
    ?.publicUrl;
}

function mapBoulder(data: BoulderRaw): Boulder {
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
    const { data, error }: PostgrestResponse<BoulderRaw> = await supabase
      .from("boulders")
      .select("*, boulder_groups(name)")
      .in("status", [BoulderStatus.CLIMBED, BoulderStatus.PROJECT]);

    if (error) {
      throw error;
    }

    const boulders: Boulder[] = data.map((item) => mapBoulder(item));

    return boulders;
  } catch (error) {
    console.error("Error fetching boulders", error);
    throw error;
  }
}

export async function fetchBoulderById(id: string) {
  try {
    const { data }: PostgrestResponse<BoulderRaw> = await supabase
      .from("boulders")
      .select("*, boulder_groups(name)")
      .eq("id", id);
    const boulder = data?.at(0);
    return boulder ? mapBoulder(boulder) : null;
  } catch (error) {
    console.error("Error fetching boulder", error);
    throw error;
  }
}

function mapBoulderGroup(data: BoulderGroup): BoulderGroup {
  return {
    id: data.id,
    name: data.name,
    description: data.description ?? null,
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
  };
}

export async function fetchBoulderGroups(): Promise<BoulderGroup[]> {
  try {
    const { data, error }: PostgrestResponse<BoulderGroup> = await supabase
      .from("boulder_groups")
      .select("*");
    if (error) {
      throw error;
    }

    const boulder_groups: BoulderGroup[] = data.map((item: BoulderGroup) =>
      mapBoulderGroup(item)
    );

    return boulder_groups;
  } catch (error) {
    console.error("Error fetching boulder groups", error);
    throw error;
  }
}

export async function fetchBoulderGroupById(id: string) {
  try {
    const { data }: PostgrestResponse<BoulderGroup> = await supabase
      .from("boulder_groups")
      .select("*")
      .eq("id", id);
    const boulderGroup = data?.at(0);
    return boulderGroup ? mapBoulderGroup(boulderGroup) : null;
  } catch (error) {
    console.error("Error fetching boulder group", error);
    throw error;
  }
}
