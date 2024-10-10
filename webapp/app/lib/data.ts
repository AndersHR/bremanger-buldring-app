import { 
  Boulder,
  BoulderGroup
} from "./definitions";
import { fetchPlaceholderBoulder, fetchPlaceholderBoulderGroup } from "./placeholder-data";

/* BOULDER */

export async function fetchBoulderById(id: string): Promise<Boulder> {
  // TODO: Implement fetching boulder by id
  return await fetchPlaceholderBoulder(id);
}

export async function fetchBoulders(): Promise<Boulder[]> {
  // TODO: Implement fetching all boulders
  return await [fetchPlaceholderBoulder("1"), fetchPlaceholderBoulder("2")];
}


/* BOULDER GROUP */

export async function fetchBoulderGroupById(id: string): Promise<BoulderGroup> {
  // TODO: Implement fetching boulder group by id
  return await fetchPlaceholderBoulderGroup("10");
}

export async function fetchBoulderGroups(): Promise<BoulderGroup[]> {
  // TODO: Implement fetching all boulder groups
  return await [fetchPlaceholderBoulderGroup("10"), fetchPlaceholderBoulderGroup("11")];
}