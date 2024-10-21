"use client";
import React, { Suspense } from "react";
import getHospitals from "@/libs/getHospitals";
import HospitalCatalog from "@/components/HospitalCatalog";
import { LinearProgress } from "@mui/material";
import { useSession } from "next-auth/react";

export default function HospitalPage() {
  const hospitalsData = getHospitals();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LinearProgress />;
  } else if (!session) {
    return (
      <h1 className="text-4xl font-bold text-center mt-40">
        Please sign in to view this page
      </h1>
    );
  }

  return (
    <main className="mt-40">
      <h1 className="text-4xl font-bold text-center mb-14">
        Select Your hospital
      </h1>
      <Suspense fallback={<LinearProgress />}>
        <HospitalCatalog hospitalsJson={hospitalsData} />
      </Suspense>
    </main>
  );
}
