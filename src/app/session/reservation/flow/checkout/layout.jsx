// COMPONENTS
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";
import { anton } from "@/app/(festival)/layout";
import Image from "next/image";

import logo from "@/assets/svg/logo_bold.svg";
import { WarningEscape } from "@/components/checkout/Header";

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
