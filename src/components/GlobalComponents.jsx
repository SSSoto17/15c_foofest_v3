import Header from "./Header";

import "@/app/globals.css";
import { Anton } from "next/font/google";
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export default function MainLayout({ page, children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base">
        <Header linksActive={page != "booking"} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export function Footer() {
  return (
    <footer className="grid place-content-center py-6 text-aztec-600">
      <small>Copyright © 2024 | All rights reserved</small>
    </footer>
  );
}
