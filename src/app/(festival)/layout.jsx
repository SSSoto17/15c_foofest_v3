import "@/app/globals.css";
import { Anton } from "next/font/google";
import { MobileNavIcon } from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/svg/logo_bold.svg";

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: "FooFest",
};

import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base grid-rows-[auto_1fr_auto]">
        <Header>
          <Link href="/">
            <Image src={logo} alt="FooFest" className="h-16 w-fit" />
          </Link>
          <Navigation />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <ul className="md:flex gap-2 hidden">
      <li>
        <Link
          href="/lineup/artists"
          className="py-2 px-6 grid place-content-center uppercase font-semibold"
        >
          Lineup 2025
        </Link>
      </li>
      <li>
        <Link
          href="/session/reservation/flow/checkout"
          className="border-2 border-forest-600 bg-forest-600 py-2 px-6 grid place-content-center uppercase font-bold"
        >
          Buy Tickets
        </Link>
      </li>
    </ul>
  );
}

function Footer() {
  return (
    <footer className="grid place-content-center py-6 text-aztec-300">
      <small>Copyright © 2024 | All rights reserved</small>
    </footer>
  );
}
