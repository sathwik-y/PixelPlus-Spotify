
import { Home, Search, Library, Plus, Heart, ArrowDown } from "lucide-react";
import { playlists } from "@/data/spotifyData";

const Sidebar = () => {
  return (
    <div className="bg-black w-60 min-w-60 h-full flex flex-col gap-2 p-2">
      <div className="mb-6 ml-3 pt-4">
        <svg viewBox="0 0 1134 340" className="h-10 text-white">
          <path
            fill="currentColor"
            d="M8 171.4C8 101.2 65.5 43.7 135.8 43.7c39.3 0 74.5 17.8 98.2 45.9 5.3 6.3 14.3 8 21.4 3.5 8.3-5.2 10.5-16.5 4.8-24.3C231.8 25.9 186.6 0 135.8 0 41 0 0 83.7 0 171.4c0 87.7 40.9 171.4 135.8 171.4 50.8 0 95.9-25.9 124.3-68.8 5.8-8.2 3.5-19.5-4.8-24.7-7.1-4.5-16.1-2.7-21.4 3.5-23.7 28.1-58.9 45.9-98.2 45.9C65.5 299 8 241.5 8 171.4zM321.3 180.4c0-65.6 50.4-118.7 114.1-118.7 63.7 0 114.1 53 114.1 118.7 0 65.6-50.4 118.7-114.1 118.7-63.7 0-114.1-53.1-114.1-118.7zm114.1 75c38.3 0 69.8-33.5 69.8-75s-31.5-75-69.8-75-69.8 33.5-69.8 75 31.5 75 69.8 75zM798.9 312.8h44.2v-95.7c0-38.3-33.5-69.9-73.4-69.9-22.8 0-41.9 8.1-54.6 23.4-11.5-15.3-31.5-23.4-53.3-23.4-22.8 0-38.9 9.6-47.4 23.3V152h-44.2v160.8h44.2v-92c0-25.6 14.5-41.9 36.6-41.9s36.6 16.3 36.6 41.9v92h44.2v-92c0-25.6 14.5-41.9 36.6-41.9s36.6 16.3 36.6 41.9v92zM1045.6 142.9c-18-7.7-37.8-11.7-62.3-11.7-62.4 0-106 53-106 118.7s43.6 118.7 106 118.7c24.5 0 44.3-4 62.3-11.7v-46.6c-16.1 14.8-33.4 23.4-57.9 23.4-38.3 0-66-33.4-66-83.7 0-50.3 27.6-83.7 66-83.7 24.5 0 41.8 8.6 57.9 23.4v-46.8z"
          ></path>
        </svg>
      </div>
      <div className="bg-spotify-darkgray rounded-md mb-2">
        <div className="p-4">
          <div className="nav-link active">
            <Home size={24} />
            <span>Home</span>
          </div>
          <div className="nav-link mt-5">
            <Search size={24} />
            <span>Search</span>
          </div>
        </div>
      </div>
      
      <div className="bg-spotify-darkgray rounded-md flex-grow overflow-hidden flex flex-col">
        <div className="p-2 flex items-center justify-between">
          <div className="nav-link p-2">
            <Library size={24} />
            <span>Your Library</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-spotify-text hover:text-white transition-colors duration-200 rounded-full hover:bg-spotify-lightgray">
              <Plus size={20} />
            </button>
            <button className="p-2 text-spotify-text hover:text-white transition-colors duration-200 rounded-full hover:bg-spotify-lightgray">
              <ArrowDown size={20} />
            </button>
          </div>
        </div>
        
        <div className="px-2 pt-0 pb-2 flex gap-2">
          <button className="bg-spotify-lightgray hover:bg-[#3e3e3e] text-white text-xs font-bold py-1 px-3 rounded-full transition-colors">
            Playlists
          </button>
          <button className="bg-spotify-lightgray hover:bg-[#3e3e3e] text-white text-xs font-bold py-1 px-3 rounded-full transition-colors">
            Artists
          </button>
        </div>
        
        <div className="px-2 py-2 flex items-center justify-between text-spotify-text">
          <button className="p-1 hover:text-white transition-colors duration-200">
            <Search size={16} />
          </button>
          <button className="text-xs font-medium hover:text-white transition-colors duration-200 flex items-center gap-1">
            Recents
            <ArrowDown size={16} />
          </button>
        </div>
        
        <div className="overflow-auto flex-grow">
          <div className="px-2 py-1">
            <div className="p-2 rounded-md hover:bg-spotify-lightgray transition-colors duration-200 cursor-pointer flex items-center gap-2">
              <div className="bg-gradient-to-br from-indigo-600 to-rose-600 w-12 h-12 rounded-md flex items-center justify-center">
                <Heart size={16} fill="white" className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Liked Songs</p>
                <p className="text-spotify-text text-xs">Playlist • 12 songs</p>
              </div>
            </div>
            
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="p-2 rounded-md hover:bg-spotify-lightgray transition-colors duration-200 cursor-pointer flex items-center gap-2"
              >
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-white font-bold text-sm">{playlist.title}</p>
                  <p className="text-spotify-text text-xs">
                    Playlist • {playlist.createdBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
