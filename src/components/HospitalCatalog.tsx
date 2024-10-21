// import React from "react";
// import Card from "./Card";
// import { HospitalJson } from "@/libs/interface";
// import Link from "next/link";

// interface HospitalCatalogProps {
//   hospitalsJson: Promise<HospitalJson>;
// }

// const HospitalCatalog: React.FC<HospitalCatalogProps> = async ({
//   hospitalsJson,
// }) => {
//   const hospitalData = await hospitalsJson;
//   const hospitals = hospitalData.data.slice(0, 3);

//   return (
//     <div className="flex flex-wrap justify-center gap-10">
//       {hospitals.map((hospital) => (
//         <Link href={`/hospital/${hospital._id}`} key={hospital._id}>
//           <Card hospitalName={hospital.name} imgSrc={hospital.picture} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default HospitalCatalog;

"use client";

import React, { useEffect, useState, useReducer, useCallback } from "react";
import Card from "./Card";
import Link from "next/link";
import getHospitals from "@/libs/getHospitals";
import { LinearProgress } from "@mui/material";

interface Hospital {
  id: string;
  name: string;
  picture: string;
}

interface HospitalApiResponse {
  success: boolean;
  count: number;
  pagination: any;
  data: Hospital[];
}

interface HospitalCatalogProps {
  hospitalsJson?: Promise<HospitalApiResponse>;
}

type RatingAction =
  | { type: "update"; id: string; rating: number }
  | { type: "remove"; id: string }
  | { type: "initialize"; ratings: { [id: string]: number } };

const ratingReducer = (
  state: { [id: string]: number },
  action: RatingAction
): { [id: string]: number } => {
  switch (action.type) {
    case "update":
      return { ...state, [action.id]: action.rating };
    case "remove":
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case "initialize":
      return action.ratings;
    default:
      return state;
  }
};

const HospitalCatalog: React.FC<HospitalCatalogProps> = ({ hospitalsJson }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ratings, dispatch] = useReducer(ratingReducer, {});
  useEffect(() => {
    // Load ratings from local storage
    const savedRatings = localStorage.getItem("hospitalRatings");
    if (savedRatings) {
      dispatch({ type: "initialize", ratings: JSON.parse(savedRatings) });
    }
  }, []);

  useEffect(() => {
    // Save ratings to local storage whenever they change
    localStorage.setItem("hospitalRatings", JSON.stringify(ratings));
  }, [ratings]);

  const handleRatingChange = useCallback((id: string, newRating: number) => {
    console.log(`Rating for hospital with ID ${id} changed to ${newRating}`);
    dispatch({ type: "update", id, rating: newRating });
  }, []);

  const handleRemoveHospital = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        let data: HospitalApiResponse;
        if (hospitalsJson) {
          data = await hospitalsJson;
        } else {
          data = await getHospitals();
        }
        if (data.success) {
          setHospitals(data.data.slice(0, 3));
        } else {
          throw new Error("Failed to fetch hospitals");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hospitals");
        setLoading(false);
      }
    }

    fetchHospitals();
  }, [hospitalsJson]);

  if (loading) return <LinearProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-10">
        {hospitals.map((hospital) => (
          <Link href={`/hospital/${hospital.id}`} key={hospital.id}>
            <Card
              hospitalName={hospital.name}
              imgSrc={hospital.picture}
              rating={ratings[hospital.id] || 0}
              onRatingChange={(newRating) =>
                handleRatingChange(hospital.id, newRating)
              }
            />
          </Link>
        ))}
      </div>
      <div>
        <div>
          <strong>
            Hospital List with Rating {Object.keys(ratings).length}
          </strong>
        </div>
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            data-testid={hospital.name}
            onClick={() => handleRemoveHospital(hospital.id)}
            style={{ cursor: "pointer" }}
          >
            {hospital.name} Rating: {ratings[hospital.id] || 0}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCatalog;
