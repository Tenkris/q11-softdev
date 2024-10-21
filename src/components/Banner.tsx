// import React from "react";
// import Image from "next/image";

// const Banner: React.FC = () => {
//   return (
//     <div className="flex justify-center items-center p-1 m-0 w-screen h-[80vh] relative">
//       <Image
//         src="/img/hospital.jpg"
//         alt="cover"
//         fill={true}
//         style={{ objectFit: "cover" }}
//       />
//       <div className="relative z-20 text-center font-bold bg-black bg-opacity-70 rounded-lg p-10 text-white">
//         <h1>Vaccine Service Center</h1>
//         <h3>Get vaccinated today</h3>
//       </div>
//     </div>
//   );
// };

// export default Banner;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Banner: React.FC = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: session } = useSession();

  const bannerImages = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handleSelectHospital = () => {
    router.push("/hospital");
  };

  return (
    <div
      className="flex justify-center items-center p-1 m-0 w-screen h-[80vh] relative cursor-pointer"
      onClick={handleImageClick}
    >
      <Image
        src={bannerImages[currentImageIndex]}
        alt="cover"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="relative z-20 text-center font-bold bg-black bg-opacity-70 rounded-lg p-10 text-white">
        <h1>Vaccine Service Center</h1>
        <h3>Get vaccinated today</h3>
      </div>
      <button
        className="absolute bottom-4 right-4 z-30 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={(e) => {
          e.stopPropagation();
          handleSelectHospital();
        }}
      >
        Select Hospital
      </button>
      {session?.user?.name && (
        <div className="absolute top-2 right-2 text-white">
          Welcome {session.user.name}
        </div>
      )}
    </div>
  );
};

export default Banner;
