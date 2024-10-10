import { Boulder, BoulderGrade, BoulderGroup } from './definitions';

export function fetchPlaceholderBoulder(id: string): Boulder {
  return {
    id: id,
    name: `Placeholder Boulder ${id}`,
    grade: BoulderGrade.FIVE,
    description: 'This is a placeholder boulder',
    location: 'location',
    boulder_group_id: '10',
    first_ascender: 'Name Nameson',
    first_ascent: new Date(2024, 1, 1),
    image_base_url: 'favicon.ico',
    image_line_url: 'favicon.ico',
    created_at: new Date(),
    updated_at: new Date()
  }
}

export function fetchPlaceholderBoulderGroup(id: string): BoulderGroup {
  return {
    id: id,
    name: `Placeholder Boulder Group ${id}`,
    boulders: [fetchPlaceholderBoulder("1"), fetchPlaceholderBoulder("2")]
  }
}