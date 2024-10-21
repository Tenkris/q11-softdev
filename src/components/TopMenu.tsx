import React from "react";
import TopMenuItem from "./TopMenuItem";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

const TopMenu: React.FC = async () => {
  const session = await getServerSession();
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center p-4 z-50 justify-between gap-5">
      {/* <Link href="/api/auth/signin" passHref>
        Sign-in
      </Link> */}
      <div className=" flex flex-row gap-7">
        {session ? (
          <Link href="/api/auth/signout" passHref>
            Sign-out
          </Link>
        ) : (
          <Link href="/api/auth/signin" passHref>
            Sign-in
          </Link>
        )}
        <div>
          <Link href="/mybooking" passHref>
            My Booking
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <TopMenuItem label="Booking" href="/booking" />
        <Link href="/" passHref>
          <Image src="/img/vaccinelogo.png" alt="Logo" width={50} height={50} />
        </Link>
      </div>
    </div>
  );
};

export default TopMenu;
