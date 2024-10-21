import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import NextAuthProvider from "@/app/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { ReduxProvider } from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vaccine Booking",
  description: "Book your vaccine appointment online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopMenu />
        <div className="mt-20">
          <NextAuthProvider session={nextAuthSession}>
            <ReduxProvider>{children}</ReduxProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
