import { createClient } from './supabaseClient';
import { Boulder, BoulderGrade, BoulderStatus } from '@/app/lib/definitions';

const supabase = createClient();

function fetchBoulderImagePublicUrl(image_url: string) {
  return supabase.storage.from("boulder_images").getPublicUrl(image_url).data?.publicUrl;
}

function mapBoulder(data: any): Boulder {
  return {
    id: data.id,
    name: data.name,
    grade: data.grade as BoulderGrade,
    description: data.description,
    location_longitude: data.location_longitude ?? null,
    location_latitude: data.location_latitude ?? null,
    first_ascender: data.first_ascender ?? null,
    first_ascent: data.first_ascent ? new Date(data.first_ascent) : null,
    boulder_group_id: data.boulder_group_id ?? null,
    image_base_url: data.image_base_url ? fetchBoulderImagePublicUrl(data.image_base_url) : null,
    image_line_url: data.image_line_url ?? null,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at: data.deleted_at ?? null,
    status: data.status as BoulderStatus,
  };
}

export async function fetchBoulders(): Promise<Boulder[]> {
  try {
    const { data, error } = await supabase.from('boulders').select('*');

    if (error) {
      throw error;
    }

    const boulders: Boulder[] = data.map((item: any) => (mapBoulder(item)));

    return boulders;
  } catch (error) {
    console.error("Error fetching boulders", error);
    throw error;
  }
}

export async function fetchActiveBoulders(): Promise<Boulder[]> {
  try {
    const { data, error } = await supabase.from('boulders').select('*').neq('status', BoulderStatus.DELETED).neq('status', BoulderStatus.INACTIVE);

    if (error) {
      throw error;
    }

    const boulders: Boulder[] = data.map((item: any) => (mapBoulder(item)));

    return boulders;
  } catch (error) {
    console.error("Error fetching boulders", error);
    throw error;
  }
}

export async function fetchBoulderById(id: string) {
  try {
    const { data } = await supabase.from('boulders').select('*').eq('id', id)
    return data?.at(0) ? mapBoulder(data?.at(0)) : null;
  } catch (error) {
    console.error("Error fetching boulder", error);
    throw error;
  }
}