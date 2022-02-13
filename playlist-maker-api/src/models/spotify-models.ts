export interface Album {
    album_type: String
    total_tracks: Number
    artists: Artist[]
    available_markets: String[]
    external_urls: {
        spotify: String
    }
    href: String
    id: String
    images: Image[]
    name: String
    release_date: String
    release_date_precision: "year" | "month" | "day"
    restrictions: {
        reason: "market" | "product" | "explicit"
    }
    type: String
    uri: String
}

export interface Image {
    url: String
    height: Number
    width: Number
}

export interface Artist {
    external_urls: {
        spotify: String
    }
    followers: {
        href: String
        total: Number
    }
    genres: String[]
    href: String
    id: String
    images: Image[]
    name: String
    popularity: Number
    type: String
    uri: String
}


export interface Track {
    album: Album
    artists: Artist[]
    available_markets: String[]
    disc_number: Number
    duration_ms: Number
    explicit: Boolean
    external_ids: {
        isrc: String
        ean: String
        upc: String
    }
    external_urls: {
        spotify: String
    }
    href: String
    id: String
    is_local: Boolean
    name: String
    popularity: Number
    preview_url: String
    track_number: Number
    type: String
    uri: String
}


