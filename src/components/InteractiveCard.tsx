"use client";

import React, { useState, ReactNode } from "react";

interface InteractiveCardProps {
  children: ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`w-[250px] h-[300px] pt-0 rounded-lg transition-shadow ${
        isHovered ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
