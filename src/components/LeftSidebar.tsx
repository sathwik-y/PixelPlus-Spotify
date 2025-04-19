import React, { useState } from 'react';
import { FaHome, FaPlus, FaList, FaSpotify } from 'react-icons/fa';
import '../styles/LeftSidebar.css';
import { yourLibrary, Album } from '../data/mockData';

interface LeftSidebarProps {
  onAlbumClick: (album: Album) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onAlbumClick }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const filteredLibrary = yourLibrary.filter(item => {
    if (!activeFilter) return true;
    if (activeFilter === 'Playlists') return item.type === 'playlist';
    if (activeFilter === 'Artists') return item.type === 'artist';
    return true;
  });

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <a href="#" className="sidebar-link active">
          <FaHome size={24} />
          <span>Home</span>
        </a>
      </div>

      <div className="sidebar-library">
        <div className="library-header">
          <div className="library-title">
            <FaList size={20} />
            <span>Your Library</span>
          </div>
          <button className="library-button">
            <FaPlus />
          </button>
        </div>

        <div className="library-filters">
          <button
            className={`filter-pill ${!activeFilter ? 'active' : ''}`}
            onClick={() => handleFilterClick(null)}
          >
            All
          </button>
          <button
            className={`filter-pill ${activeFilter === 'Playlists' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Playlists')}
          >
            Playlists
          </button>
          <button
            className={`filter-pill ${activeFilter === 'Artists' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Artists')}
          >
            Artists
          </button>
        </div>

        <div className="library-items">
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              className="library-item"
              onClick={() => onAlbumClick(item)}
            >
              <img
                src={item.cover}
                alt={item.title}
                className={item.type === 'artist' ? 'round-image' : ''}
              />
              <div className="library-item-info">
                <p className="library-item-title">{item.title}</p>
                <p className="library-item-meta">
                  {item.type === 'playlist' ? 'Playlist' : 'Artist'}
                  {item.artist ? ` • ${item.artist}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
