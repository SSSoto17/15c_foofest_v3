import Header from "@/components/Header";

import "@/app/globals.css";
import { Anton } from "next/font/google";
export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: "FooFest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base">
        <Header linksActive={true} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="grid place-content-center row-start-3 py-6 text-aztec-300">
      <small>Copyright © 2024 | All rights reserved</small>
    </footer>
  );
}
