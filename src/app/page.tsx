import React from "react";
import Banner from "@/components/Banner";
import PromoteCard from "../components/PromoteCard";
const Page: React.FC = () => {
  return (
    <main className="h-screen">
      <div>
        <Banner />
        <PromoteCard />
      </div>
    </main>
  );
};

export default Page;
