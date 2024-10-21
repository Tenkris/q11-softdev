"use client";
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  vdoSrc: string;
  isPlaying: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ vdoSrc, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return <video ref={videoRef} src={vdoSrc} />;
};

export default VideoPlayer;
