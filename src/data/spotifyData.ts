
export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverImage: string;
  releaseYear: number;
}

export interface Track {
  id: string;
  title: string;
  artist: Artist[];
  album: Album;
  duration: number; // in seconds
  explicit: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  createdBy: string;
  tracks: Track[];
  followers: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  playlists: Playlist[];
  following: Artist[];
  recentlyPlayed: Track[];
  topArtists: Artist[];
}

// Sample Artists
export const artists: Artist[] = [
  { id: "1", name: "The Weeknd", image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
  { id: "2", name: "Dua Lipa", image: "https://i.scdn.co/image/ab6761610000e5eb563bab85b196adc5cebdade6" },
  { id: "3", name: "Kendrick Lamar", image: "https://i.scdn.co/image/ab6761610000e5eb40f7c17c7fd5056f0c064819" },
  { id: "4", name: "Taylor Swift", image: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" },
  { id: "5", name: "Drake", image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9" },
  { id: "6", name: "Bad Bunny", image: "https://i.scdn.co/image/ab6761610000e5eb8ee9a6f54f937b20df3aa193" },
  { id: "7", name: "Billie Eilish", image: "https://i.scdn.co/image/ab6761610000e5eb5d6d9b5ccd70c1f7bf23a9a3" },
  { id: "8", name: "SZA", image: "https://i.scdn.co/image/ab6761610000e5eb909dcf8e9293bf1c7b37eb15" },
];

// Sample Albums
export const albums: Album[] = [
  { id: "1", title: "After Hours", artist: artists[0], coverImage: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36", releaseYear: 2020 },
  { id: "2", title: "Future Nostalgia", artist: artists[1], coverImage: "https://i.scdn.co/image/ab67616d0000b2734dd19ceeda24232605aef2ad", releaseYear: 2020 },
  { id: "3", title: "Mr. Morale & The Big Steppers", artist: artists[2], coverImage: "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f", releaseYear: 2022 },
  { id: "4", title: "Midnights", artist: artists[3], coverImage: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5", releaseYear: 2022 },
  { id: "5", title: "Certified Lover Boy", artist: artists[4], coverImage: "https://i.scdn.co/image/ab67616d0000b2732a9b4558d2c051a8a71c0e36", releaseYear: 2021 },
  { id: "6", title: "Un Verano Sin Ti", artist: artists[5], coverImage: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a", releaseYear: 2022 },
  { id: "7", title: "Happier Than Ever", artist: artists[6], coverImage: "https://i.scdn.co/image/ab67616d0000b273c65f8d04502d2c91a1c5381a", releaseYear: 2021 },
  { id: "8", title: "SOS", artist: artists[7], coverImage: "https://i.scdn.co/image/ab67616d0000b273a3a7f38ea2033aa501afd4cf", releaseYear: 2022 },
];

// Sample Tracks
export const tracks: Track[] = [
  { id: "1", title: "Blinding Lights", artist: [artists[0]], album: albums[0], duration: 200, explicit: false },
  { id: "2", title: "Levitating", artist: [artists[1]], album: albums[1], duration: 203, explicit: false },
  { id: "3", title: "N95", artist: [artists[2]], album: albums[2], duration: 195, explicit: true },
  { id: "4", title: "Anti-Hero", artist: [artists[3]], album: albums[3], duration: 208, explicit: false },
  { id: "5", title: "Way 2 Sexy", artist: [artists[4]], album: albums[4], duration: 193, explicit: true },
  { id: "6", title: "Tití Me Preguntó", artist: [artists[5]], album: albums[5], duration: 244, explicit: true },
  { id: "7", title: "Happier Than Ever", artist: [artists[6]], album: albums[6], duration: 298, explicit: true },
  { id: "8", title: "Kill Bill", artist: [artists[7]], album: albums[7], duration: 153, explicit: true },
  { id: "9", title: "Save Your Tears", artist: [artists[0]], album: albums[0], duration: 215, explicit: false },
  { id: "10", title: "Don't Start Now", artist: [artists[1]], album: albums[1], duration: 183, explicit: false },
  { id: "11", title: "Rich Spirit", artist: [artists[2]], album: albums[2], duration: 202, explicit: true },
  { id: "12", title: "Lavender Haze", artist: [artists[3]], album: albums[3], duration: 187, explicit: false },
  { id: "13", title: "Girls Want Girls", artist: [artists[4]], album: albums[4], duration: 210, explicit: true },
  { id: "14", title: "Moscow Mule", artist: [artists[5]], album: albums[5], duration: 247, explicit: true },
  { id: "15", title: "NDA", artist: [artists[6]], album: albums[6], duration: 198, explicit: true },
  { id: "16", title: "Shirt", artist: [artists[7]], album: albums[7], duration: 176, explicit: true },
];

// Sample Playlists
export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Today's Top Hits",
    description: "The hottest tracks right now - globally!",
    coverImage: "https://i.scdn.co/image/ab67706f000000036d28fa952d5c976c157ecc52",
    createdBy: "Spotify",
    tracks: [tracks[0], tracks[1], tracks[2], tracks[7]],
    followers: 31427842,
  },
  {
    id: "2",
    title: "RapCaviar",
    description: "New music from Drake, 21 Savage and Moneybagg Yo.",
    coverImage: "https://i.scdn.co/image/ab67706f00000003c5b0a450a82d6ca62ed8c967",
    createdBy: "Spotify",
    tracks: [tracks[2], tracks[4], tracks[10], tracks[12]],
    followers: 14572651,
  },
  {
    id: "3",
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    coverImage: "https://i.scdn.co/image/ab67706f00000003b0fe40a6e1692822f5a9d8f1",
    createdBy: "Spotify",
    tracks: [tracks[0], tracks[8], tracks[9], tracks[15]],
    followers: 6782451,
  },
  {
    id: "4",
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire generations.",
    coverImage: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32d63416",
    createdBy: "Spotify",
    tracks: [tracks[1], tracks[3], tracks[6], tracks[11]],
    followers: 9462785,
  },
  {
    id: "5",
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    coverImage: "https://i.scdn.co/image/ab67706f00000003e8252e84d7e6eede4835571e",
    createdBy: "Spotify",
    tracks: [tracks[3], tracks[7], tracks[11], tracks[15]],
    followers: 5846214,
  },
  {
    id: "6",
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando nuestra música.",
    coverImage: "https://i.scdn.co/image/ab67706f000000034ea0c917a55bcb514e4a4e27",
    createdBy: "Spotify",
    tracks: [tracks[5], tracks[13], tracks[1], tracks[9]],
    followers: 12458632,
  },
];

// Sample Categories
export const categories: Category[] = [
  { id: "1", name: "Pop", image: "https://i.scdn.co/image/ab67706f00000003b70e0223f544b1faa2e95ed0" },
  { id: "2", name: "Hip-Hop", image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e" },
  { id: "3", name: "Rock", image: "https://i.scdn.co/image/ab67706f00000003f6b1483ff9d6552a46db226f" },
  { id: "4", name: "Latin", image: "https://i.scdn.co/image/ab67706f00000003a046e262dfa5d1f2977710c7" },
  { id: "5", name: "R&B", image: "https://i.scdn.co/image/ab67706f000000033c6d424e1d139afb6ef3b41c" },
  { id: "6", name: "Workout", image: "https://i.scdn.co/image/ab67706f000000033084f8ed52d35058fe6c9826" },
  { id: "7", name: "Electronic/Dance", image: "https://i.scdn.co/image/ab67706f000000030db1b4d05a02a375ba8a6626" },
  { id: "8", name: "Indie", image: "https://i.scdn.co/image/ab67706f0000000370414741fd02289e62aeb334" },
];

// Sample User
export const currentUser: User = {
  id: "1",
  name: "User",
  image: "https://i.scdn.co/image/ab6775700000ee850e75484e75dc13f976e20d34",
  playlists: [playlists[0], playlists[1], playlists[4]],
  following: [artists[0], artists[3], artists[6]],
  recentlyPlayed: [tracks[0], tracks[3], tracks[5], tracks[7], tracks[13]],
  topArtists: [artists[0], artists[3], artists[5], artists[6]],
};

export const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
