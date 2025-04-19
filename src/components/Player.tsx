
import { useState } from "react";
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, 
  Shuffle, Mic2, ListMusic, MonitorSpeaker, Volume2, 
  Maximize2, Heart
} from "lucide-react";
import { tracks } from "@/data/spotifyData";
import { formatDuration } from "@/data/spotifyData";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(60);
  
  // Mock data - assuming this would come from a playing context in a real app
  const currentTrack = tracks[0];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] p-4 z-20">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 w-[30%]">
          <img 
            src={currentTrack.album.coverImage} 
            alt={currentTrack.title} 
            className="w-14 h-14 object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm text-white font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-spotify-text truncate">{currentTrack.artist.map(a => a.name).join(', ')}</p>
          </div>
          <button className="text-spotify-text hover:text-white">
            <Heart size={16} />
          </button>
        </div>
        
        <div className="flex flex-col items-center w-[40%]">
          <div className="flex items-center gap-4 mb-1">
            <button className="text-spotify-text hover:text-white">
              <Shuffle size={16} />
            </button>
            <button className="text-spotify-text hover:text-white">
              <SkipBack size={16} />
            </button>
            <button 
              className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause size={16} className="text-black" />
              ) : (
                <Play size={16} className="text-black" fill="currentColor" />
              )}
            </button>
            <button className="text-spotify-text hover:text-white">
              <SkipForward size={16} />
            </button>
            <button className="text-spotify-text hover:text-white">
              <Repeat size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-spotify-text min-w-8">
              {formatDuration(currentTime)}
            </span>
            <div className="w-full h-1 bg-[#5e5e5e] rounded-full group">
              <input
                type="range"
                min="0"
                max={currentTrack.duration}
                value={currentTime}
                onChange={handleTimeChange}
                className="w-full absolute opacity-0 cursor-pointer"
              />
              <div 
                className="h-1 bg-white group-hover:bg-spotify-green rounded-full relative"
                style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"></div>
              </div>
            </div>
            <span className="text-xs text-spotify-text min-w-8">
              {formatDuration(currentTrack.duration)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 justify-end w-[30%]">
          <button className="text-spotify-text hover:text-white">
            <Mic2 size={16} />
          </button>
          <button className="text-spotify-text hover:text-white">
            <ListMusic size={16} />
          </button>
          <button className="text-spotify-text hover:text-white">
            <MonitorSpeaker size={16} />
          </button>
          <div className="flex items-center gap-1 w-24">
            <Volume2 size={16} className="text-spotify-text" />
            <div className="w-full h-1 bg-[#5e5e5e] rounded-full group">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full absolute opacity-0 cursor-pointer"
              />
              <div 
                className="h-1 bg-white group-hover:bg-spotify-green rounded-full relative"
                style={{ width: `${volume}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
          <button className="text-spotify-text hover:text-white">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
