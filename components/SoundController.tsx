import React, { useState, useEffect, useRef } from 'react';

export const SoundController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a reliable Wikimedia Commons source for forest ambience
    audioRef.current = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e4/Forest_ambience_-_birds_and_wind.ogg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // User interaction required to start audio
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleSound}
      className="w-10 h-10 rounded-full bg-[#2D5016] border-2 border-[#5C4033] flex items-center justify-center text-[#F4EBD9] hover:bg-[#1a350d] transition-transform hover:scale-105 shadow-[2px_2px_0px_#5C4033] active:translate-y-[1px] active:shadow-none"
      title={isPlaying ? "Mute Nature Sounds" : "Play Nature Sounds"}
    >
      {isPlaying ? (
        // Volume On Icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-4 0h-2.59l-5 5h-3.41v6h3.41l5 5h2.59v-16z"/>
        </svg>
      ) : (
        // Volume Off Icon
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
           <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51c.66-1.24 1.03-2.65 1.03-4.15 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      )}
    </button>
  );
};