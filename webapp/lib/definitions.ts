export enum BoulderGrade {
  UBESTEMT = "Ubestemt",
  THREE = "3",
  THREEPLUS = "3+",
  FOUR = "4",
  FOURPLUS = "4+",
  FIVE = "5",
  FIVEPLUS = "5+",
  SIXA = "6A",
  SIXAPLUS = "6A+",
  SIXB = "6B",
  SIXBPLUS = "6B+",
  SIXC = "6C",
  SIXCPLUS = "6C+",
  SEVENA = "7A",
  SEVENAPLUS = "7A+",
  SEVENB = "7B",
  SEVENBPLUS = "7B+",
  SEVENC = "7C",
  SEVENCPLUS = "7C+",
  EIGHTA = "8A",
  EIGHTAPLUS = "8A+",
  EIGHTB = "8B",
  EIGHTBPLUS = "8B+",
  EIGHTC = "8C",
  EIGHTCPLUS = "8C+",
  NINEA = "9A",
}

export enum BoulderStatus {
  CLIMBED = "Besteget",
  PROJECT = "Prosjekt",
  INACTIVE = "Inaktiv",
  DELETED = "Slettet",
}

export enum BoulderStart {
  SIT = "Sittstart",
  STAND = "Ståstart",
  HOP = "Hoppstart",
}

export type BoulderRaw = {
  id: string;
  name: string;
  grade: BoulderGrade;
  start: BoulderStart;
  description: string;
  longitude: number | null;
  latitude: number | null;
  boulder_group_id: string | null;
  boulder_groups: {
    name: string;
  };
  // First ascent
  first_ascender: string | null;
  first_ascent: Date | null;
  // Image URLS
  image_base_url: string | null;
  image_line_url: string | null;
  // Metadata
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  status: BoulderStatus;
};

export type Boulder = Omit<BoulderRaw, "boulder_groups"> & {
  boulder_group_name: string | null;
};

export type BoulderGroup = {
  id: string;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type BoulderGroupWithBoulders = {
  id: string;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  boulders: Boulder[];
};
