import { PlayCircle, Heart, MoreHorizontal, Clock } from "lucide-react";
import { playlists, artists, tracks, albums, currentUser, formatDuration } from "@/data/spotifyData";

const MainContent = () => {
  const featuredPlaylists = playlists.slice(0, 6);
  const topArtists = artists.slice(0, 6);
  const recentlyPlayed = currentUser.recentlyPlayed.slice(0, 6);
  
  return (
    <div className="flex-grow">
      <div className="bg-gradient-to-b from-[#1F1F1F] to-spotify-black p-6">
        <h2 className="text-2xl font-bold mb-4">Good afternoon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyPlayed.map((track, index) => (
            index < 6 && (
              <div 
                key={track.id}
                className="bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded flex items-center overflow-hidden group cursor-pointer"
              >
                <img
                  src={track.album.coverImage}
                  alt={track.title}
                  className="w-12 h-12 mr-4"
                />
                <span className="font-bold truncate">{track.title}</span>
                <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle fill="#1DB954" className="text-black" size={32} />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Made for You</h2>
          <span className="text-spotify-text text-sm font-bold hover:underline cursor-pointer">Show all</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card group cursor-pointer">
              <div className="relative">
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="playlist-card-image shadow-lg"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <PlayCircle size={32} fill="currentColor" />
                </button>
              </div>
              <div>
                <h3 className="card-title">{playlist.title}</h3>
                <p className="card-description">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Popular artists</h2>
          <span className="text-spotify-text text-sm font-bold hover:underline cursor-pointer">Show all</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {topArtists.map((artist) => (
            <div key={artist.id} className="playlist-card group cursor-pointer">
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="playlist-card-image rounded-full shadow-lg"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-spotify-green text-black flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <PlayCircle size={32} fill="currentColor" />
                </button>
              </div>
              <div>
                <h3 className="card-title">{artist.name}</h3>
                <p className="card-description">Artist</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-2 mb-8"> {/* Added mb-8 for more bottom margin */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Recently played</h2>
          <span className="text-spotify-text text-sm font-bold hover:underline cursor-pointer">Show all</span>
        </div>
        
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2 text-spotify-text">#</th>
              <th className="px-4 py-2 text-spotify-text">Title</th>
              <th className="px-4 py-2 text-spotify-text">Album</th>
              <th className="px-4 py-2 text-spotify-text">Date added</th>
              <th className="px-4 py-2 text-spotify-text">
                <Clock size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {tracks.slice(0, 5).map((track, index) => (
              <tr 
                key={track.id} 
                className="hover:bg-white/10 group"
              >
                <td className="px-4 py-3 text-spotify-text group-hover:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={track.album.coverImage} 
                      alt={track.title} 
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="text-white font-medium">{track.title}</p>
                      <p className="text-spotify-text text-sm">
                        {track.artist.map(a => a.name).join(', ')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-spotify-text">
                  {track.album.title}
                </td>
                <td className="px-4 py-3 text-spotify-text">
                  2 days ago
                </td>
                <td className="px-4 py-3 text-spotify-text">
                  {formatDuration(track.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainContent;
