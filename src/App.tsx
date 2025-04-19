import React from 'react';
import { useState, useEffect, useRef } from 'react';
// import './App.css';
import './styles/App.css';
import './styles/animations.css';
import { FaHome, FaSearch, FaPlus, FaGlobe, FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaRandom, FaRedoAlt, FaList, FaHeart, FaBars, FaChevronLeft, FaChevronRight, FaSpotify, FaPalette, FaFilter } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { madeForYouPlaylists, recentlyPlayed, popularArtists, yourLibrary, currentUser, Album, Track } from './data/mockData';
import LeftSidebar from './components/LeftSidebar';
import gsap from 'gsap';

type Theme = 'dark' | 'light' | 'retro';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [trackSearchResults, setTrackSearchResults] = useState<Track[]>([]); // Add state for track results
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('dark');
  const [showNotifications, setShowNotifications] = useState(false); // <-- Add notification state
  const [randomCriteria, setRandomCriteria] = useState<{
    genre: string | null;
    artist: string | null;
    mood: string | null;
  }>({
    genre: null,
    artist: null,
    mood: null,
  });
  const [showRandomDropdown, setShowRandomDropdown] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  // Refs for GSAP animations
  const mainContentRef = useRef<HTMLDivElement>(null);
  const albumModalRef = useRef<HTMLDivElement>(null);
  const playerBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const recentGridRef = useRef<HTMLDivElement>(null);
  const notificationPopupRef = useRef<HTMLDivElement>(null); // <-- Ref for notification animation

  // Initial animation on component mount
  useEffect(() => {
    // Main content entrance animation
    gsap.from(mainContentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out"
    });

    // Recent grid staggered entrance - Simple fade-in for all items
    gsap.from(".recent-item", {
      opacity: 0,
      duration: 0.5, 
      stagger: 0.08, 
      ease: "power2.out" 
      // No 'y' offset needed, rely on CSS grid for positioning
    });

    // Cards staggered entrance
    gsap.from(".card", {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power1.out",
      delay: 0.3
    });

    // Player bar slide up
    gsap.from(playerBarRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: "power2.out"
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // If query is empty, clear results and return
    if (!query.trim()) {
      setSearchResults([]);
      setTrackSearchResults([]);
      return;
    }
    
    // Search for albums/playlists/artists
    const albumResults = yourLibrary.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.artist && item.artist.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(albumResults);
    
    // Search for individual tracks across all albums/playlists
    const allTracks: Track[] = [];
    
    // Gather all tracks from your library
    yourLibrary.forEach(album => {
      album.tracks.forEach(track => {
        // Add the album cover to the track for display
        const trackWithCover = {
          ...track,
          cover: track.cover || album.cover,
          albumTitle: album.title
        };
        allTracks.push(trackWithCover as Track);
      });
    });
    
    // Also include tracks from made for you playlists
    madeForYouPlaylists.forEach(playlist => {
      playlist.tracks.forEach(track => {
        const trackWithCover = {
          ...track,
          cover: track.cover || playlist.cover,
          albumTitle: playlist.title
        };
        allTracks.push(trackWithCover as Track);
      });
    });
    
    // And from popular artists
    popularArtists.forEach(artist => {
      artist.tracks.forEach(track => {
        const trackWithCover = {
          ...track,
          cover: track.cover || artist.cover,
          albumTitle: artist.title
        };
        allTracks.push(trackWithCover as Track);
      });
    });
    
    // Filter the tracks based on search query
    const trackResults = allTracks.filter(track =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      (track.artist && track.artist.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Remove duplicates (tracks with same id)
    const uniqueTrackResults = trackResults.reduce((unique: Track[], item: Track) => {
      return unique.find(t => t.id === item.id) ? unique : [...unique, item];
    }, []);
    
    setTrackSearchResults(uniqueTrackResults);
    
    console.log("Search Results:", albumResults);
    console.log("Track Results:", uniqueTrackResults);
  };

  // Animation when search results appear
  useEffect(() => {
    if (searchResults.length > 0 || trackSearchResults.length > 0) {
      gsap.fromTo(".search-results-section", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      
      gsap.fromTo(".search-results-section .card, .search-track-item", 
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.4, 
          stagger: 0.05,
          ease: "power1.out" 
        }
      );
    }
  }, [searchResults, trackSearchResults]);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && currentTrack) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          return prev >= 100 ? 0 : prev + 0.1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Progress bar animation - with specific selector
  useEffect(() => {
    if (isPlaying) {
      gsap.to(".player-controls .progress-bar-filled", {
        width: `${progress}%`,
        duration: 0.2,
        ease: "none"
      });
    }
  }, [progress, isPlaying]);

  // Album modal animations
  useEffect(() => {
    if (selectedAlbum) {
      // Animate modal backdrop
      gsap.to(".modal-backdrop", {
        backgroundColor: "rgba(0,0,0,0.7)",
        duration: 0.3,
        ease: "power2.inOut"
      });
      
      // Animate modal content
      gsap.fromTo(albumModalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
      
      // Stagger track items
      gsap.fromTo(".track-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, delay: 0.2 }
      );
    }
  }, [selectedAlbum]);

  // Random dropdown animation
  useEffect(() => {
    if (showRandomDropdown) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showRandomDropdown]);

  // Notification popover animation
  useEffect(() => {
    if (showNotifications) {
      gsap.fromTo(notificationPopupRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power1.out" }
      );
    }
  }, [showNotifications]);

  // Handle theme change with animation
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    
    // Flash animation when theme changes
    gsap.to("body", {
      backgroundColor: theme === 'light' ? "#ffffff" : (theme === 'dark' ? "#121212" : "#533e2d"),
      duration: 0.5,
      ease: "power1.inOut"
    });
    
    gsap.fromTo(".main-content, .left-sidebar, .player-bar",
      { opacity: 0.8 },
      { opacity: 1, duration: 0.5 }
    );
  }, [theme]);

  const formatTime = (percentage: number): string => {
    if (!currentTrack) return "0:00";
    
    const durationParts = currentTrack.duration.split(':');
    const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const debugTrackChange = (direction: 'next' | 'prev') => {
    console.log(`${direction} track requested`);
    console.log(`Current playlist length: ${currentPlaylist.length}`);
    console.log(`Current track index: ${currentTrackIndex}`);
    
    if (currentPlaylist.length === 0) {
      console.log("No playlist available, attempting to use a default playlist");
      if (selectedAlbum && selectedAlbum.tracks.length > 0) {
        setCurrentPlaylist(selectedAlbum.tracks);
        setCurrentTrackIndex(0);
        playTrack(selectedAlbum.tracks[0]);
        return true;
      } else if (madeForYouPlaylists.length > 0 && madeForYouPlaylists[0].tracks.length > 0) {
        setCurrentPlaylist(madeForYouPlaylists[0].tracks);
        setCurrentTrackIndex(0);
        playTrack(madeForYouPlaylists[0].tracks[0]);
        return true;
      }
      return false;
    }
    return true;
  };

  const nextTrack = () => {
    if (!debugTrackChange('next')) return;
    
    const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    
    gsap.to(".now-playing", {
      opacity: 0,
      x: -20,
      duration: 0.2,
      onComplete: () => {
        setCurrentTrackIndex(nextIndex);
        setCurrentTrack(currentPlaylist[nextIndex]);
        setProgress(0);
        gsap.to(".now-playing", {
          opacity: 1,
          x: 0,
          duration: 0.3
        });
      }
    });
  };

  const previousTrack = () => {
    if (!debugTrackChange('prev')) return;
    
    const prevIndex = currentTrackIndex === 0 ? currentPlaylist.length - 1 : currentTrackIndex - 1;
    
    gsap.to(".now-playing", {
      opacity: 0,
      x: 20,
      duration: 0.2,
      onComplete: () => {
        setCurrentTrackIndex(prevIndex);
        setCurrentTrack(currentPlaylist[prevIndex]);
        setProgress(0);
        gsap.to(".now-playing", {
          opacity: 1,
          x: 0,
          duration: 0.3
        });
      }
    });
  };

  const handleProgressSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const newProgress = (clickPosition / progressBarWidth) * 100;
    
    setProgress(Math.max(0, Math.min(100, newProgress)));
    
    gsap.to(".player-controls .progress-bar-filled", {
      width: `${newProgress}%`,
      duration: 0.1
    });
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const volumeBarWidth = rect.width;
    const newVolume = (clickPosition / volumeBarWidth) * 100;
    
    setVolume(Math.max(0, Math.min(100, newVolume)));
    
    gsap.to(".volume-container .progress-bar-filled", {
      width: `${newVolume}%`,
      duration: 0.2
    });
  };

  const playTrack = (track: Track, playlist?: Track[], index?: number) => {
    if (playlist && index !== undefined) {
      setCurrentPlaylist(playlist);
      setCurrentTrackIndex(index);
    } else if (selectedAlbum) {
      const trackIndex = selectedAlbum.tracks.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        setCurrentPlaylist(selectedAlbum.tracks);
        setCurrentTrackIndex(trackIndex);
      }
    } else {
      for (const album of yourLibrary) {
        const trackIndex = album.tracks.findIndex(t => t.id === track.id);
        if (trackIndex !== -1) {
          setCurrentPlaylist(album.tracks);
          setCurrentTrackIndex(trackIndex);
          break;
        }
      }
    }
    
    if (currentTrack) {
      gsap.to(".now-playing", {
        opacity: 0,
        x: -20,
        duration: 0.2,
        onComplete: () => {
          setCurrentTrack(track);
          setIsPlaying(true);
          setProgress(0);
          gsap.to(".now-playing", {
            opacity: 1,
            x: 0,
            duration: 0.3,
            delay: 0.1
          });
        }
      });
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
      gsap.fromTo(".now-playing", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4 }
      );
    }
  };

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
      
      gsap.to(".play-button", {
        scale: 1.2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    } else if (madeForYouPlaylists.length > 0 && madeForYouPlaylists[0].tracks.length > 0) {
      playTrack(madeForYouPlaylists[0].tracks[0]);
    }
  };

  const handleAlbumClick = (album: Album) => {
    if (album.type === 'artist') {
      const filteredAlbum = {
        ...album,
        tracks: album.tracks.filter(track => track.artist === album.title)
      };
      setSelectedAlbum(filteredAlbum);
    } else {
      setSelectedAlbum(album);
    }
  };

  const closeAlbumModal = () => {
    gsap.to(".modal-backdrop", {
      backgroundColor: "rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.inOut"
    });
    
    gsap.to(".album-modal", {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => setSelectedAlbum(null)
    });
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, Jump Right Back In!";
    if (hour < 18) return "Good afternoon, Jump Right Back In!";
    return "Good evening, Jump Right Back In!";
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'dark') return 'light';
      if (prevTheme === 'light') return 'retro';
      return 'dark';
    });
  };

  const toggleRandomDropdown = () => {
    if (!showRandomDropdown) {
      setShowRandomDropdown(true);
    } else {
      gsap.to(".random-dropdown", {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        onComplete: () => setShowRandomDropdown(false)
      });
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close profile menu if open
    if (!showNotifications) {
        setShowProfileMenu(false);
    }
  };

  const updateRandomCriteria = (key: 'genre' | 'artist' | 'mood', value: string | null) => {
    setRandomCriteria({
      ...randomCriteria,
      [key]: value,
    });
  };

  const clearRandomCriteria = () => {
    setRandomCriteria({
      genre: null,
      artist: null,
      mood: null,
    });
  };

  const playRandomTrack = () => {
    const allTracks = yourLibrary.reduce((acc, album) => {
      return acc.concat(album.tracks);
    }, [] as Track[]);
    
    let filteredTracks = [...allTracks];
    let appliedFilters = false;
    
    if (randomCriteria.artist && randomCriteria.artist !== '') {
      filteredTracks = filteredTracks.filter(track => 
        track.artist && track.artist.toLowerCase() === randomCriteria.artist?.toLowerCase()
      );
      appliedFilters = true;
    }
    
    if (appliedFilters && filteredTracks.length === 0) {
      alert("No tracks match the selected criteria. Try a different filter combination.");
      return;
    }
    
    if (filteredTracks.length === 0) {
      filteredTracks = allTracks;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredTracks.length);
    const randomTrack = filteredTracks[randomIndex];
    
    if (randomTrack) {
      console.log(`Playing random track: "${randomTrack.title}" by ${randomTrack.artist}`);
      if (appliedFilters) {
        console.log("Filters applied:", 
          randomCriteria.genre ? `Genre: ${randomCriteria.genre}` : '', 
          randomCriteria.artist ? `Artist: ${randomCriteria.artist}` : '',
          randomCriteria.mood ? `Mood: ${randomCriteria.mood}` : ''
        );
      }
      
      playTrack(randomTrack);
    }
  };

  return (
    <div className={`app-container theme-${theme}`}>
      <LeftSidebar onAlbumClick={handleAlbumClick} />
      <div className="main-content-wrapper">
        <main className="main-content" ref={mainContentRef}>
          <div className="topbar">
            <div className="topbar-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="What do you want to play?"
                className="search-input"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="random-feature">
              <button
                className="random-action-btn" // Keep specific class if needed, but styling is now more general
                onClick={playRandomTrack}
                title="Play Random Track"
              >
                <FaRandom className="random-icon" /> {/* Icon only */}
              </button>
              <button
                className="filter-action-btn" // Keep specific class if needed
                onClick={toggleRandomDropdown}
                title="Filter Random Options"
              >
                <FaFilter /> {/* Icon only */}
              </button>

              {showRandomDropdown && (
                <div className="random-dropdown" ref={dropdownRef}>
                  <div className="dropdown-header">
                    <h3>Filter Random</h3>
                    <button onClick={clearRandomCriteria}>Clear All</button>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Genre</h4>
                    <select 
                      value={randomCriteria.genre || ''}
                      onChange={(e) => updateRandomCriteria('genre', e.target.value || null)}
                    >
                      <option value="">Any Genre</option>
                      <option value="pop">Pop</option>
                      <option value="rock">Rock</option>
                      <option value="hiphop">Hip-Hop</option>
                      <option value="electronic">Electronic</option>
                      <option value="jazz">Jazz</option>
                    </select>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Artist</h4>
                    <select 
                      value={randomCriteria.artist || ''}
                      onChange={(e) => updateRandomCriteria('artist', e.target.value || null)}
                    >
                      <option value="">Any Artist</option>
                      {[...new Set(popularArtists.map(artist => artist.title))].map(artist => (
                        <option key={artist} value={artist}>{artist}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Mood</h4>
                    <select 
                      value={randomCriteria.mood || ''}
                      onChange={(e) => updateRandomCriteria('mood', e.target.value || null)}
                    >
                      <option value="">Any Mood</option>
                      <option value="happy">Happy</option>
                      <option value="energetic">Energetic</option>
                      <option value="relaxing">Relaxing</option>
                      <option value="sad">Sad</option>
                      <option value="focus">Focus</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="user-controls">
              <button
                className="nav-btn theme-btn"
                onClick={toggleTheme}
                title={`Switch Theme (Current: ${theme})`}
              >
                <FaPalette size={20} />
              </button>
              <button 
                className="topbar-btn premium"
                onClick={() => window.open('https://www.spotify.com/premium/', '_blank')}
              >
                Explore Premium
              </button>
              <button 
                className="topbar-btn install"
                onClick={() => window.open('https://www.spotify.com/download/', '_blank')}
              >
                <FaGlobe /> Install App
              </button>
              <div className="notification-container" style={{ position: 'relative' }}> {/* <-- Wrapper for positioning */}
                <button className="nav-btn" onClick={toggleNotifications}> {/* <-- Add onClick */}
                  <IoMdNotificationsOutline size={20} />
                </button>
                {showNotifications && ( /* <-- Conditional rendering */
                  <div className="notification-popover" ref={notificationPopupRef}>
                    No notifications
                  </div>
                )}
              </div>
              <div
                className="user-profile topbar-btn"
                onClick={() => {
                  // Just animate the profile button with a subtle bounce effect
                  gsap.to(".user-profile", {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                  });
                }}
              >
                <img src={currentUser.avatar} alt="Profile" />
                <span>{currentUser.name}</span>
              </div>
            </div>
          </div>
          
          <div className="main-content-inner">
            <div className="page-header">
              <h1 className="greeting-header">{greeting()}</h1>
            </div>
          
            {searchQuery && (searchResults.length > 0 || trackSearchResults.length > 0) && (
              <>
                {/* Album/Artist search results section */}
                {searchResults.length > 0 && (
                  <section className="section search-results-section">
                    <div className="section-title">
                      <span>Albums & Artists</span>
                    </div>
                    <div className="grid-container">
                      {searchResults.map((item: Album) => (
                        <div
                          key={item.id}
                          className="card"
                          onClick={() => handleAlbumClick(item)}
                        >
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="card-image"
                            style={item.type === 'artist' ? { borderRadius: '50%' } : {}}
                          />
                          <h3 className="card-title">{item.title}</h3>
                          <p className="card-subtitle">{item.type === 'artist' ? 'Artist' : item.artist || 'Playlist'}</p>
                          {item.tracks && item.tracks.length > 0 && (
                            <div
                              className="card-play"
                              onClick={(e) => {
                                e.stopPropagation();
                                playTrack(item.tracks[0]);
                              }}
                            >
                              <FaPlay />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Track search results section */}
                {trackSearchResults.length > 0 && (
                  <section className="section search-results-section">
                    <div className="section-title">
                      <span>Songs</span>
                    </div>
                    <div className="track-results">
                      {trackSearchResults.slice(0, 8).map((track, index) => (
                        <div 
                          key={`track-${track.id}-${index}`} 
                          className="track-item search-track-item"
                          onClick={() => playTrack(track)}
                        >
                          <div className="track-item-cover">
                            <img src={track.cover} alt={track.title} />
                            <div className="track-play-icon">
                              <FaPlay />
                            </div>
                          </div>
                          <div className="track-item-info">
                            <div className="track-item-name">{track.title}</div>
                            <div className="track-item-artist">{track.artist} • {track.albumTitle}</div>
                          </div>
                          <div className="track-item-duration">{track.duration}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
            
            {searchQuery && searchResults.length === 0 && trackSearchResults.length === 0 && (
              <div className="no-results-message">No results found for "{searchQuery}"</div>
            )}

            <div className="recent-grid" ref={recentGridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {recentlyPlayed.map((item) => (
                <div 
                  key={item.id} 
                  className="recent-item"
                  onClick={() => handleAlbumClick(item)}
                >
                  <img src={item.cover} alt={item.title} />
                  <div className="recent-item-title">{item.title}</div>
                </div>
              ))}
            </div>
            
            <section className="section">
              <div className="section-title">
                <span>Made for You</span>
                <a href="/made-for-you">Show all</a>
              </div>
              <div className="grid-container">
                {madeForYouPlaylists.map((playlist) => (
                  <div 
                    key={playlist.id} 
                    className="card"
                    onClick={() => handleAlbumClick(playlist)}
                  >
                    <img 
                      src={playlist.cover} 
                      alt={playlist.title} 
                      className="card-image" 
                    />
                    <h3 className="card-title">{playlist.title}</h3>
                    <p className="card-subtitle">{playlist.description}</p>
                    <div 
                      className="card-play"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (playlist.tracks.length > 0) {
                          playTrack(playlist.tracks[0]);
                        }
                      }}
                    >
                      <FaPlay />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="section">
              <div className="section-title">
                <span>Popular artists</span>
                <a href="/artists">Show all</a>
              </div>
              <div className="grid-container">
                {popularArtists.map((artist) => (
                  <div 
                    key={artist.id} 
                    className="card"
                    onClick={() => handleAlbumClick(artist)}
                  >
                    <img 
                      src={artist.cover} 
                      alt={artist.title} 
                      className="card-image" 
                      style={{ borderRadius: '50%' }}
                    />
                    <h3 className="card-title">{artist.title}</h3>
                    <p className="card-subtitle">Artist</p>
                    <div 
                      className="card-play"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (artist.tracks.length > 0) {
                          playTrack(artist.tracks[0]);
                        }
                      }}
                    >
                      <FaPlay />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      
      {selectedAlbum && (
        <div className="modal-backdrop" onClick={closeAlbumModal}>
          <div className="album-modal" ref={albumModalRef} onClick={(e) => e.stopPropagation()}>
            <div className="album-header">
              <img src={selectedAlbum.cover} alt={selectedAlbum.title} className="album-cover" />
              <div className="album-info">
                <div className="album-type">{selectedAlbum.type.toUpperCase()}</div>
                <h1 className="album-title">{selectedAlbum.title}</h1>
                <div className="album-meta">
                  <span className="album-artist">{selectedAlbum.artist}</span>
                  {selectedAlbum.tracks.length > 0 && (
                    <> • {selectedAlbum.tracks.length} songs</>
                  )}
                </div>
              </div>
            </div>
            <div className="album-tracks">
              <div className="track-list-header">
                <div>#</div>
                <div>TITLE</div>
                <div>ARTIST</div>
                <div>DURATION</div>
              </div>
              {selectedAlbum.tracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className="track-item"
                  onClick={() => playTrack(track)}
                >
                  <div className="track-item-number">{index + 1}</div>
                  <div className="track-item-title">
                    <span className="track-item-name">{track.title}</span>
                  </div>
                  <div className="track-item-artist">{track.artist}</div>
                  <div className="track-item-duration">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="player-bar" ref={playerBarRef}>
        <div className="now-playing">
          {currentTrack && (
            <>
              <img src={currentTrack.cover} alt={currentTrack.title} />
              <div className="now-playing-info">
                <div className="now-playing-title">{currentTrack.title}</div>
                <div className="now-playing-artist">{currentTrack.artist}</div>
              </div>
              <button className="control-button">
                <FaHeart />
              </button>
            </>
          )}
        </div>
        
        <div className="player-controls">
          <div className="player-buttons">
            <button className="control-button">
              <FaRandom />
            </button>
            <button 
              className="control-button" 
              onClick={previousTrack}
              title="Previous Track"
            >
              <FaStepBackward />
            </button>
            <button className="play-button" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button 
              className="control-button" 
              onClick={nextTrack}
              title="Next Track"
            >
              <FaStepForward />
            </button>
            <button className="control-button">
              <FaRedoAlt />
            </button>
          </div>
          <div className="progress-container">
            <span>{formatTime(progress)}</span>
            <div 
              className="progress-bar" 
              onClick={handleProgressSeek}
              style={{ cursor: 'pointer' }}
            >
              <div className="progress-bar-filled" style={{ width: `${progress}%` }}></div>
            </div>
            <span>{currentTrack ? currentTrack.duration : "--:--"}</span>
          </div>
        </div>
        
        <div className="player-options">
          <button className="control-button">
            <FaList />
          </button>
          <div className="volume-container">
            <button className="control-button">
              <FaVolumeUp />
            </button>
            <div 
              className="progress-bar"
              onClick={handleVolumeChange}
              style={{ cursor: 'pointer' }}
            >
              <div className="progress-bar-filled" style={{ width: `${volume}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
