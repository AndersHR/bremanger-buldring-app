export enum BoulderGrade {
    THREE = '3',
    FOUR = '4',
    FOURPLUS = '4+',
    FIVE = '5',
    FIVEPLUS = '5+',
    SIXA = '6A',
    SIXAPLUS = '6A+',
    SIXB = '6B',
    SIXBPLUS = '6B+',
    SIXC = '6C',
    SIXCPLUS = '6C+',
    SEVENA = '7A',
    SEVENAPLUS = '7A+',
    SEVENB = '7B',
    SEVENBPLUS = '7B+',
    SEVENC = '7C',
    SEVENCPLUS = '7C+',
    EIGHTA = '8A',
    EIGHTAPLUS = '8A+',
    EIGHTB = '8B',
    EIGHTBPLUS = '8B+',
    EIGHTC = '8C',
    EIGHTCPLUS = '8C+',
    NINEA = '9A',
}

export type Boulder = {
    id: string,
    name: string,
    grade: BoulderGrade,
    description: string,
    location: string,
    first_ascender: string,
    first_ascent: Date,
    boulder_group_id: string,
    // Image URLS
    image_base_url: string,
    image_line_url: string,
    // Metadata
    created_at: Date | null,
    updated_at: Date | null,
}

export type BoulderGroup = {
    id: string,
    name: string,
    boulders: Boulder[]
}