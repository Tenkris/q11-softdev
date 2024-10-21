"use client";

import React, { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

interface Hospital {
  hid: string;
  name: string;
  imgSrc: string;
}

const hospitals: Hospital[] = [
  { hid: "001", name: "Chulalongkorn Hospital", imgSrc: "/img/chula.jpg" },
  { hid: "002", name: "Rajavithi Hospital", imgSrc: "/img/rajavithi.jpg" },
  {
    hid: "003",
    name: "Thammasat University Hospital",
    imgSrc: "/img/thammasat.jpg",
  },
];

type RatingAction =
  | { type: "update"; hid: string; rating: number }
  | { type: "remove"; hid: string };

const ratingReducer = (
  state: Map<string, number>,
  action: RatingAction
): Map<string, number> => {
  const newState = new Map(state);
  if (action.type === "update") {
    newState.set(action.hid, action.rating);
  } else if (action.type === "remove") {
    newState.delete(action.hid);
  }
  return newState;
};

const CardPanel: React.FC = () => {
  const [ratings, dispatch] = useReducer(
    ratingReducer,
    new Map(hospitals.map((hospital) => [hospital.hid, 0]))
  );

  const handleRatingChange = (hid: string, newRating: number) => {
    console.log(`Rating for hospital with ID ${hid} changed to ${newRating}`);
    dispatch({ type: "update", hid, rating: newRating });
  };

  const handleRemoveHospital = (hid: string) => {
    dispatch({ type: "remove", hid });
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-10 m-5">
        {hospitals.map((hospital) => (
          <Link href={`/hospital/${hospital.hid}`} key={hospital.hid}>
            <div data-testid={`${hospital.name} Rating`}>
              <Card
                hospitalName={hospital.name}
                imgSrc={hospital.imgSrc}
                rating={ratings.get(hospital.hid) || 0}
                onRatingChange={(newRating) =>
                  handleRatingChange(hospital.hid, newRating)
                }
              />
            </div>
          </Link>
        ))}
      </div>
      <div>
        <div>
          <strong>Hospital List with Rating {ratings.size}</strong>
        </div>
        {hospitals.map((hospital) => (
          <div
            key={hospital.hid}
            data-testid={hospital.name}
            onClick={() => handleRemoveHospital(hospital.hid)}
            style={{ cursor: "pointer" }}
          >
            {hospital.name} Rating: {ratings.get(hospital.hid) || 0}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPanel;
