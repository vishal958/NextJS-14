import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "@/utils/SessionProvider";
import Navbar from '@/components/Navbar'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Pass",
  description: "Time Pass Auth App",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>

    </html>
  );
}
