import React from "react";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

interface CardProps {
  hospitalName: string;
  imgSrc: string;
  rating?: number;
  onRatingChange?: (newRating: number) => void;
}

const Card: React.FC<CardProps> = ({
  hospitalName,
  imgSrc,
  rating,
  onRatingChange,
}) => {
  return (
    <InteractiveCard>
      <div className="w-full h-[70%] relative">
        <Image
          src={imgSrc}
          alt={`${hospitalName} image`}
          fill={true}
          style={{
            objectFit: "cover",
            height: "100%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      </div>
      <div className="flex flex-col gap-1 p-2 h-[30%]">
        <strong>{hospitalName}</strong>
        {rating !== undefined && onRatingChange && (
          <div onClick={(e) => e.stopPropagation()}>
            <Rating
              name={`${hospitalName} Rating`}
              value={rating}
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  onRatingChange(newValue);
                }
              }}
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );
};

export default Card;
