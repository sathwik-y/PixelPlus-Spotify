export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  type: 'album' | 'playlist' | 'artist' | 'podcast';
  year?: string;
  description?: string;
  tracks: Track[];
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  subscription: 'free' | 'premium';
}

// Verified working image URLs
const VERIFIED_IMAGES = {
  albums: [
    'https://i.scdn.co/image/ab67616d0000b27313e54d6687e65678d60466c2', // The Weeknd
    'https://i.scdn.co/image/ab67616100005174e672b5f553298dcdccb0e676', // Taylor Swift
    'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72', // Bad Bunny
    'https://i.scdn.co/image/ab676161000051744a21b4760d2ecb7b0dcdc8da', // Billie Eilish
    'https://i.scdn.co/image/ab67616100005174f7db7c8ede90a019c54590bb', // Harry Styles
  ],
  playlists: [
    'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba', // Today's Top Hits
    'https://i.scdn.co/image/ab67706f000000025f5afb34181310c62914d04a', // RapCaviar 
    'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e', // All Out 2010s
    'https://i.scdn.co/image/ab67706f00000002212d776c31027c511f0ee3bc', // Mood Booster
    'https://i.scdn.co/image/ab67706f000000026e65f020506feb291c7b2768', // Chill Hits
    'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6', // Peaceful Piano
  ],
  artists: [
    'https://i.scdn.co/image/ab676161000051749e528993a2820267b97f6aae', // The Weeknd
    'https://i.scdn.co/image/ab67616100005174e672b5f553298dcdccb0e676', // Taylor Swift
    'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9', // Drake
    'https://i.scdn.co/image/ab676161000051744a21b4760d2ecb7b0dcdc8da', // Billie Eilish
    'https://i.scdn.co/image/ab67616100005174f7db7c8ede90a019c54590bb', // Harry Styles
    'https://i.scdn.co/image/ab676161000051740c68f6c95232e716f0abee8d', // Dua Lipa
  ],
  user: 'https://i.scdn.co/image/ab6775700000ee85577e4ca75a68464485ce6598' // Default user
};

export const currentUser = {
  id: 'user1',
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg', // Using a random user image URL
  recentlyPlayed: [
    // ... existing recently played items ...
  ]
};

// --- Expanded Track Database with 10+ songs per artist ---
export const allTracks: Track[] = [
  // THE WEEKND - 12 songs
  { id: 'tw1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: VERIFIED_IMAGES.albums[0] },
  { id: 'tw2', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', cover: VERIFIED_IMAGES.albums[0] },
  { id: 'tw3', title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', cover: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e8a457a55603333' },
  { id: 'tw4', title: 'Die For You', artist: 'The Weeknd', album: 'Starboy', duration: '4:20', cover: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e8a457a55603333' },
  { id: 'tw5', title: 'I Feel It Coming', artist: 'The Weeknd', album: 'Starboy', duration: '4:29', cover: 'https://i.scdn.co/image/ab67616d0000b2734718e2b12e8a457a55603333' },
  { id: 'tw6', title: 'The Hills', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '3:55', cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a' },
  { id: 'tw7', title: 'Can\'t Feel My Face', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '3:33', cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a' },
  { id: 'tw8', title: 'Earned It', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '4:37', cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a' },
  { id: 'tw9', title: 'After Hours', artist: 'The Weeknd', album: 'After Hours', duration: '6:01', cover: VERIFIED_IMAGES.albums[0] },
  { id: 'tw10', title: 'Heartless', artist: 'The Weeknd', album: 'After Hours', duration: '3:18', cover: VERIFIED_IMAGES.albums[0] },
  { id: 'tw11', title: 'Call Out My Name', artist: 'The Weeknd', album: 'My Dear Melancholy,', duration: '3:48', cover: 'https://i.scdn.co/image/ab67616d0000b273130d177b8b7890b49ef8c986'},
  { id: 'tw12', title: 'Often', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '4:09', cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a' },
  
  // TAYLOR SWIFT - 12 songs
  { id: 'ts1', title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: '3:20', cover: VERIFIED_IMAGES.albums[1] },
  { id: 'ts2', title: 'Blank Space', artist: 'Taylor Swift', album: '1989', duration: '3:51', cover: 'https://i.scdn.co/image/ab67616d0000b273a70a4f8e63a0a55a1819f0f6' },
  { id: 'ts3', title: 'Shake It Off', artist: 'Taylor Swift', album: '1989', duration: '3:39', cover: 'https://i.scdn.co/image/ab67616d0000b273a70a4f8e63a0a55a1819f0f6' },
  { id: 'ts4', title: 'Cruel Summer', artist: 'Taylor Swift', album: 'Lover', duration: '2:58', cover: 'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431' },
  { id: 'ts5', title: 'Love Story', artist: 'Taylor Swift', album: 'Fearless (Taylor\'s Version)', duration: '3:55', cover: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de' },
  { id: 'ts6', title: 'You Belong With Me', artist: 'Taylor Swift', album: 'Fearless (Taylor\'s Version)', duration: '3:52', cover: 'https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de' },
  { id: 'ts7', title: 'Wildest Dreams', artist: 'Taylor Swift', album: '1989', duration: '3:40', cover: 'https://i.scdn.co/image/ab67616d0000b273a70a4f8e63a0a55a1819f0f6' },
  { id: 'ts8', title: 'All Too Well', artist: 'Taylor Swift', album: 'Red (Taylor\'s Version)', duration: '10:13', cover: 'https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d' },
  { id: 'ts9', title: 'Cardigan', artist: 'Taylor Swift', album: 'folklore', duration: '3:59', cover: 'https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233' },
  { id: 'ts10', title: 'Lavender Haze', artist: 'Taylor Swift', album: 'Midnights', duration: '3:22', cover: VERIFIED_IMAGES.albums[1] },
  { id: 'ts11', title: 'August', artist: 'Taylor Swift', album: 'folklore', duration: '4:21', cover: 'https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233' },
  { id: 'ts12', title: 'Style', artist: 'Taylor Swift', album: '1989', duration: '3:51', cover: 'https://i.scdn.co/image/ab67616d0000b273a70a4f8e63a0a55a1819f0f6' },
  
  // DRAKE - 11 songs
  { id: 'dr1', title: 'One Dance', artist: 'Drake', album: 'Views', duration: '2:53', cover: 'https://i.scdn.co/image/ab67616d0000b273f145e9fcbcc1b5c715106f22' },
  { id: 'dr2', title: 'God\'s Plan', artist: 'Drake', album: 'Scorpion', duration: '3:18', cover: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5' },
  { id: 'dr3', title: 'Hotline Bling', artist: 'Drake', album: 'Views', duration: '4:27', cover: 'https://i.scdn.co/image/ab67616d0000b273f145e9fcbcc1b5c715106f22' },
  { id: 'dr4', title: 'Rich Flex', artist: 'Drake', album: 'Her Loss', duration: '3:59', cover: 'https://i.scdn.co/image/ab67616d0000b2733be1e0a8afd87a88334f060a' },
  { id: 'dr5', title: 'Started From the Bottom', artist: 'Drake', album: 'Nothing Was the Same', duration: '2:53', cover: 'https://i.scdn.co/image/ab67616d0000b273a4f779c64a7bf3e276966e39' },
  { id: 'dr6', title: 'In My Feelings', artist: 'Drake', album: 'Scorpion', duration: '3:37', cover: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5' },
  { id: 'dr7', title: 'Nice For What', artist: 'Drake', album: 'Scorpion', duration: '3:30', cover: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5' },
  { id: 'dr8', title: 'Passionfruit', artist: 'Drake', album: 'More Life', duration: '4:58', cover: 'https://i.scdn.co/image/ab67616d0000b27382437b5bebcffbb777121b88' },
  { id: 'dr9', title: 'Toosie Slide', artist: 'Drake', album: 'Dark Lane Demo Tapes', duration: '4:07', cover: 'https://i.scdn.co/image/ab67616d0000b2735a00c5a8bc17271c9c5dca28' },
  { id: 'dr10', title: 'Headlines', artist: 'Drake', album: 'Take Care', duration: '3:56', cover: 'https://i.scdn.co/image/ab67616d0000b273c0e7bf5cdd630f314f20586f' },
  { id: 'dr11', title: 'Hold On, We\'re Going Home', artist: 'Drake', album: 'Nothing Was the Same', duration: '3:47', cover: 'https://i.scdn.co/image/ab67616d0000b273a4f779c64a7bf3e276966e39' },
  
  // BILLIE EILISH - 10 songs
  { id: 'be1', title: 'Bad Guy', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', duration: '3:14', cover: VERIFIED_IMAGES.albums[3] },
  { id: 'be2', title: 'Happier Than Ever', artist: 'Billie Eilish', album: 'Happier Than Ever', duration: '4:58', cover: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e' },
  { id: 'be3', title: 'Ocean Eyes', artist: 'Billie Eilish', album: 'dont smile at me', duration: '3:20', cover: 'https://i.scdn.co/image/ab67616d0000b27369b601f03c00a17c14f4e9f5' },
  { id: 'be4', title: 'everything i wanted', artist: 'Billie Eilish', album: 'everything i wanted', duration: '4:05', cover: 'https://i.scdn.co/image/ab67616d0000b273a91c119f02cac35f62b9b701' },
  { id: 'be5', title: 'Lovely', artist: 'Billie Eilish, Khalid', album: '13 Reasons Why', duration: '3:20', cover: 'https://i.scdn.co/image/ab67616d0000b273e58a0c593b712ef0bef65e0d' },
  { id: 'be6', title: 'Therefore I Am', artist: 'Billie Eilish', album: 'Happier Than Ever', duration: '2:54', cover: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e' },
  { id: 'be7', title: 'When The Party\'s Over', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', duration: '3:16', cover: VERIFIED_IMAGES.albums[3] },
  { id: 'be8', title: 'Your Power', artist: 'Billie Eilish', album: 'Happier Than Ever', duration: '4:05', cover: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e' },
  { id: 'be9', title: 'idontwannabeyouanymore', artist: 'Billie Eilish', album: 'dont smile at me', duration: '3:23', cover: 'https://i.scdn.co/image/ab67616d0000b27369b601f03c00a17c14f4e9f5' },
  { id: 'be10', title: 'Bury a Friend', artist: 'Billie Eilish', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', duration: '3:13', cover: VERIFIED_IMAGES.albums[3] },
  
  // HARRY STYLES - 10 songs
  { id: 'hs1', title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', duration: '2:47', cover: VERIFIED_IMAGES.albums[4] },
  { id: 'hs2', title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', cover: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' },
  { id: 'hs3', title: 'Sign of the Times', artist: 'Harry Styles', album: 'Harry Styles', duration: '5:41', cover: 'https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f068161d6b9e' },
  { id: 'hs4', title: 'Adore You', artist: 'Harry Styles', album: 'Fine Line', duration: '3:27', cover: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' },
  { id: 'hs5', title: 'Late Night Talking', artist: 'Harry Styles', album: 'Harry\'s House', duration: '2:57', cover: VERIFIED_IMAGES.albums[4] },
  { id: 'hs6', title: 'Falling', artist: 'Harry Styles', album: 'Fine Line', duration: '4:00', cover: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' },
  { id: 'hs7', title: 'Golden', artist: 'Harry Styles', album: 'Fine Line', duration: '3:29', cover: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' },
  { id: 'hs8', title: 'Lights Up', artist: 'Harry Styles', album: 'Fine Line', duration: '2:52', cover: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14' },
  { id: 'hs9', title: 'Music For a Sushi Restaurant', artist: 'Harry Styles', album: 'Harry\'s House', duration: '3:13', cover: VERIFIED_IMAGES.albums[4] },
  { id: 'hs10', title: 'Matilda', artist: 'Harry Styles', album: 'Harry\'s House', duration: '4:05', cover: VERIFIED_IMAGES.albums[4] },
  
  // DUA LIPA - 10 songs
  { id: 'dl1', title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:03', cover: 'https://i.scdn.co/image/ab67616d0000b273d4f3a58d94c0aa95fa78a436' },
  { id: 'dl2', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', cover: 'https://i.scdn.co/image/ab67616d0000b273d4f3a58d94c0aa95fa78a436' },
  { id: 'dl3', title: 'New Rules', artist: 'Dua Lipa', album: 'Dua Lipa', duration: '3:29', cover: 'https://i.scdn.co/image/ab67616d0000b2731f6a2a40bb692936879db730' },
  { id: 'dl4', title: 'Physical', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:13', cover: 'https://i.scdn.co/image/ab67616d0000b273d4f3a58d94c0aa95fa78a436' },
  { id: 'dl5', title: 'Break My Heart', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:41', cover: 'https://i.scdn.co/image/ab67616d0000b273d4f3a58d94c0aa95fa78a436' },
  { id: 'dl6', title: 'One Kiss', artist: 'Calvin Harris, Dua Lipa', album: 'One Kiss', duration: '3:34', cover: 'https://i.scdn.co/image/ab67616d0000b273d09f96d82310d4d77c14c108' },
  { id: 'dl7', title: 'IDGAF', artist: 'Dua Lipa', album: 'Dua Lipa', duration: '3:38', cover: 'https://i.scdn.co/image/ab67616d0000b2731f6a2a40bb692936879db730' },
  { id: 'dl8', title: 'Electricity', artist: 'Silk City, Dua Lipa', album: 'Electricity', duration: '3:58', cover: 'https://i.scdn.co/image/ab67616d0000b273e0197be25008f1b7b79f2edd' },
  { id: 'dl9', title: 'Be the One', artist: 'Dua Lipa', album: 'Dua Lipa', duration: '3:22', cover: 'https://i.scdn.co/image/ab67616d0000b2731f6a2a40bb692936879db730' },
  { id: 'dl10', title: 'Hallucinate', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:28', cover: 'https://i.scdn.co/image/ab67616d0000b273d4f3a58d94c0aa95fa78a436' },
  
  // BAD BUNNY - 10 songs
  { id: 'bb1', title: 'Tití Me Preguntó', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', duration: '4:03', cover: VERIFIED_IMAGES.albums[2] },
  { id: 'bb2', title: 'Me Porto Bonito', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', duration: '2:58', cover: VERIFIED_IMAGES.albums[2] },
  { id: 'bb3', title: 'Callaita', artist: 'Bad Bunny', album: 'Callaita', duration: '4:11', cover: 'https://i.scdn.co/image/ab67616d0000b273d66fbf5900a45ca5479d3fc2' },
  { id: 'bb4', title: 'Dakiti', artist: 'Bad Bunny', album: 'EL ÚLTIMO TOUR DEL MUNDO', duration: '3:25', cover: 'https://i.scdn.co/image/ab67616d0000b273005ee342f4eef2cc6e8436ab' },
  { id: 'bb5', title: 'Moscow Mule', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', duration: '4:06', cover: VERIFIED_IMAGES.albums[2] },
  { id: 'bb6', title: 'Yonaguni', artist: 'Bad Bunny', album: 'Yonaguni', duration: '3:28', cover: 'https://i.scdn.co/image/ab67616d0000b273a91c119f02cac35f62b9b701' },
  { id: 'bb7', title: 'La Canción', artist: 'Bad Bunny, J Balvin', album: 'OASIS', duration: '4:02', cover: 'https://i.scdn.co/image/ab67616d0000b273c5716278abba6a103ad12f90' },
  { id: 'bb8', title: 'Vete', artist: 'Bad Bunny', album: 'YHLQMDLG', duration: '3:12', cover: 'https://i.scdn.co/image/ab67616d0000b2738c5f00b9ebe2fe61cc8d37b6' },
  { id: 'bb9', title: 'Efecto', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', duration: '3:33', cover: VERIFIED_IMAGES.albums[2] },
  { id: 'bb10', title: 'Mia', artist: 'Bad Bunny, Drake', album: 'Mia', duration: '3:46', cover: 'https://i.scdn.co/image/ab67616d0000b2738bafc7e593dce457eff55af8' },
  
  // Additional popular tracks for playlists
  { id: 'ex1', title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', duration: '3:20', cover: 'https://i.scdn.co/image/ab67616d0000b273f1dfa248e4a9f0d67159f6a1' },
  { id: 'ex2', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3: OVER YOU', duration: '2:21', cover: 'https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02' },
  { id: 'ex3', title: 'good 4 u', artist: 'Olivia Rodrigo', album: 'SOUR', duration: '2:58', cover: 'https://i.scdn.co/image/ab67616d0000b273a91c119f02cac35f62b9b701' },
];

const getPlaylistTracks = (count: number, startIndex: number = 0): Track[] => {
  const selectedTracks: Track[] = [];
  for (let i = 0; i < count; i++) {
    selectedTracks.push(allTracks[(startIndex + i) % allTracks.length]);
  }
  return selectedTracks;
};

export const recentlyPlayed: Album[] = [
  {
    id: 'rp1',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: VERIFIED_IMAGES.albums[0],
    type: 'album',
    tracks: allTracks.filter(t => t.album === 'After Hours' && t.artist === 'The Weeknd')
  },
  {
    id: 'rp2',
    title: 'Midnights',
    artist: 'Taylor Swift',
    cover: VERIFIED_IMAGES.albums[1],
    type: 'album',
    tracks: allTracks.filter(t => t.album === 'Midnights' && t.artist === 'Taylor Swift')
  },
  {
    id: 'rp3',
    title: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    cover: VERIFIED_IMAGES.albums[2],
    type: 'album',
    tracks: allTracks.filter(t => t.album === 'Un Verano Sin Ti' && t.artist === 'Bad Bunny')
  },
  {
    id: 'rp4',
    title: 'Harry\'s House',
    artist: 'Harry Styles',
    cover: VERIFIED_IMAGES.albums[4],
    type: 'album',
    tracks: allTracks.filter(t => t.album === 'Harry\'s House' && t.artist === 'Harry Styles')
  },
  {
    id: 'rp5',
    title: "Today's Top Hits",
    artist: 'Spotify',
    cover: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
    type: 'playlist',
    tracks: getPlaylistTracks(10, 5)
  },
];

export const madeForYouPlaylists: Album[] = [
  {
    id: 'playlist1',
    title: "Today's Top Hits",
    artist: 'Spotify',
    description: 'The hottest tracks right now',
    cover: 'https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934',
    type: 'playlist',
    tracks: getPlaylistTracks(20, 0)
  },
  {
    id: 'playlist2',
    title: 'RapCaviar',
    artist: 'Spotify',
    description: 'New music from Drake, Kendrick and more',
    cover: 'https://i.scdn.co/image/ab67706f00000003a6e2870c97bde5e2719c20b8',
    type: 'playlist',
    tracks: [
      ...allTracks.filter(t => t.artist === 'Drake'),
      ...getPlaylistTracks(15, 10)
    ].slice(0, 20)
  },
  {
    id: 'playlist3',
    title: 'All Out 2010s',
    artist: 'Spotify',
    description: 'The biggest songs of the 2010s',
    cover: 'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e',
    type: 'playlist',
    tracks: [
      allTracks.find(t => t.title === 'Blank Space')!,
      allTracks.find(t => t.title === 'Hotline Bling')!,
      allTracks.find(t => t.title === 'Starboy')!,
      allTracks.find(t => t.title === 'New Rules')!,
      allTracks.find(t => t.title === 'Sign of the Times')!,
      ...getPlaylistTracks(15, 3)
    ].filter(Boolean).slice(0, 20)
  },
  {
    id: 'playlist4',
    title: 'Mood Booster',
    artist: 'Spotify',
    description: 'Boost your mood with these upbeat tracks!',
    cover: 'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
    type: 'playlist',
    tracks: getPlaylistTracks(20, 5)
  },
  {
    id: 'playlist5',
    title: 'Chill Hits',
    artist: 'Spotify',
    description: 'Kick back to the best new and recent chill hits',
    cover: 'https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe',
    type: 'playlist',
    tracks: getPlaylistTracks(20, 15)
  }
];

export const popularArtists: Album[] = [
  {
    id: 'artist1',
    title: 'The Weeknd',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[0],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'The Weeknd' || track.artist.includes('The Weeknd'))
  },
  {
    id: 'artist2',
    title: 'Taylor Swift',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[1],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'Taylor Swift' || track.artist.includes('Taylor Swift'))
  },
  {
    id: 'artist3',
    title: 'Drake',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[2],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'Drake' || track.artist.includes('Drake'))
  },
  {
    id: 'artist4',
    title: 'Billie Eilish',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[3],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'Billie Eilish' || track.artist.includes('Billie Eilish'))
  },
  {
    id: 'artist5',
    title: 'Harry Styles',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[4],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'Harry Styles' || track.artist.includes('Harry Styles'))
  },
  {
    id: 'artist6',
    title: 'Dua Lipa',
    artist: 'Artist',
    cover: VERIFIED_IMAGES.artists[5],
    type: 'artist',
    tracks: allTracks.filter(track => track.artist === 'Dua Lipa' || track.artist.includes('Dua Lipa'))
  }
];

export const yourLibrary: Album[] = [
  {
    id: 'liked',
    title: 'Liked Songs',
    artist: 'Playlist',
    cover: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
    type: 'playlist',
    tracks: getPlaylistTracks(30, 2)
  },
  madeForYouPlaylists[0],
  recentlyPlayed[0],
  popularArtists[0],
  madeForYouPlaylists[1],
];

// Add songs data or extract from albums
export const songs = [
  {
    id: 'song-1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    cover: '/covers/queen.jpg',
    duration: '5:55',
    url: '/songs/bohemian-rhapsody.mp3'
  },
  {
    id: 'song-2',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    cover: '/covers/michael-jackson.jpg',
    duration: '4:54',
    url: '/songs/billie-jean.mp3'
  },
  // Add more songs...
];
