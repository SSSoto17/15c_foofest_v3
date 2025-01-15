import "@/app/globals.css";

// COMPONENTS
import { Suspense } from "react";
import Loading from "./loading";
import { anton } from "@/lib/utils";
import Image from "next/image";
import Header from "@/components/Header";
import { WarningEscape } from "@/components/checkout/Header";

import logo from "@/assets/svg/logo_bold.svg";

export const metadata = {
  title: "FooFest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base grid-rows-[auto_1fr]">
        <Header>
          <WarningEscape />
          <Image src={logo} alt="FooFest" className="h-14 w-fit" />
        </Header>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
