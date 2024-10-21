import Link from "next/link";
import React from "react";

interface TopMenuItemProps {
  label: string;
  href: string;
}

const TopMenuItem: React.FC<TopMenuItemProps> = ({ label, href }) => {
  return (
    <Link href={href} className="text-gray-700 hover:text-gray-900 font-medium">
      {label}
    </Link>
  );
};

export default TopMenuItem;
