"use client";
import React, { useState, useCallback } from "react";
import VideoPlayer from "./VideoPlayer";
import useWindowListener from "../hooks/useWindowListener";

const PromoteCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleContextMenu = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  useWindowListener("contextmenu", handleContextMenu);

  return (
    <div className="flex flex-row items-center space-x-4 mt-8 justify-center">
      <div className="w-1/3">
        <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={isPlaying} />
      </div>
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-semibold">Get your vaccinated today.</h1>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default PromoteCard;
