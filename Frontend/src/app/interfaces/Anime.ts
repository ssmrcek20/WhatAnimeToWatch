
export interface Anime {
    id: number;
    title?: string;
    main_picture?: MainPicture;
    alternative_titles?: AlternativeTitles;
    start_date?: string;
    end_date?: string;
    synopsis?: string;
    mean?: number;
    rank?: number;
    popularity?: number;
    num_list_users?: number;
    num_scoring_users?: number;
    nsfw?: string;
    genres?: Genre[] | null;
    created_at?: Date;
    updated_at?: Date;
    media_type?: string;
    status?: string;
    num_episodes?: number;
    start_season?: StartSeason;
    broadcast?: Broadcast;
    source?: string;
    average_episode_duration?: number;
    rating?: string;
    studios?: Studio[] | null;
}

export interface MainPicture {
    medium?: string;
    large?: string;
}

export interface AlternativeTitles {
    synonyms?: string[] | null;
    en?: string;
    ja?: string;
}

export interface Genre {
    id: number;
    name?: string;
}

export interface StartSeason {
    year?: number;
    season?: string;
}

export interface Broadcast {
    day_of_the_week?: string;
    start_time?: string;
}

export interface Studio {
    id: number;
    name?: string;
}

