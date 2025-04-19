import { ChevronLeft, ChevronRight, Bell, User, ExternalLink, Search } from "lucide-react";
import { currentUser } from "@/data/spotifyData";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  title?: string;
  transparent?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({ title, transparent = false, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isMobileSearchVisible && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchVisible]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-10 flex flex-col ${
        transparent ? "bg-transparent" : "bg-[#121212]/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="bg-black/70 p-1 rounded-full">
              <ChevronLeft className="text-white/70 hover:text-white" size={28} />
            </button>
            <button className="bg-black/70 p-1 rounded-full">
              <ChevronRight className="text-white/70 hover:text-white" size={28} />
            </button>
          </div>
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
        </div>
        
        {/* Desktop search bar - always visible on md screens and up */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="What do you want to listen to?"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-[#242424] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button 
            onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)} 
            className="md:hidden p-2 bg-black/70 rounded-full"
          >
            <Search size={20} className="text-white" />
          </button>
          <button className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
            Explore Premiu
          </button>
          <button className="bg-black/70 text-white flex items-center gap-1 text-sm font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
            <ExternalLink size={16} /> Install App
          </button>
          <button className="p-2 bg-black/70 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-1 bg-black/70 rounded-full">
            <img 
              src={currentUser.image} 
              alt="Profile" 
              className="w-7 h-7 rounded-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile search bar - shown when toggle is active */}
      {isMobileSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="What do you want to listen to?"
              className="w-full py-2 pl-10 pr-4 rounded-full bg-[#242424] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
