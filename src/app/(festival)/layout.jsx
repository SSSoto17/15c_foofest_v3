import "@/app/globals.css";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import {
  Disclosure,
  DisclosurePanel,
  CloseButton,
  DisclosureButton,
} from "@headlessui/react";

import { anton } from "@/lib/utils";
import logo from "@/assets/svg/logo_bold.svg";

export const metadata = {
  title: "FooFest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base grid-rows-[auto_1fr_auto]">
        <Header>
          <Navigation />
          <MobileNav />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <>
      <Link href="/">
        <Image src={logo} alt="FooFest" className="h-16 w-fit" />
      </Link>
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
    </>
  );
}

function MobileNav() {
  return (
    <Disclosure>
      <MobileNavIcon />
      <DisclosurePanel
        transition={true}
        className="md:hidden fixed inset-0 w-screen grid place-content-center data-closed:left-full bg-[#171e1b] drop-shadow-main gap-4 transition-[left] duration-500 ease-in-out text-2xl"
      >
        <CloseButton
          as={Link}
          className="py-2 px-6 uppercase font-semibold cursor-pointer"
          href="/lineup/artists"
        >
          Lineup 2025
        </CloseButton>
        <CloseButton
          as={Link}
          className="border-2 border-forest-600 bg-forest-600 py-2 px-6 uppercase font-bold cursor-pointer"
          href="/session/reservation/flow/checkout"
        >
          Buy Tickets
        </CloseButton>
      </DisclosurePanel>
    </Disclosure>
  );
}

function MobileNavIcon() {
  const role = {
    top: "group:transition-[transform] group-data-open:rotate-45 group-data-open:translate-y-1.5 group-data-closed:-translate-y-0.5",
    middle:
      "group:transition-[opacity] my-1 group-data-open:opacity-0 group-data-closed:opacity-100",
    bottom:
      "group:transition-[transform] group-data-open:-rotate-45 group-data-open:-translate-y-1.5 group-data-closed:translate-y-0.5",
  };

  function setClasses(role) {
    return (
      "bg-forest-100 block duration-300 ease-out h-0.5 w-6 rounded-sm z-100 " +
      role
    );
  }

  return (
    <DisclosureButton
      aria-label="Navigation"
      className="group z-10 cursor-pointer md:hidden"
    >
      <span className={setClasses(role.top)} />
      <span className={setClasses(role.middle)} />
      <span className={setClasses(role.bottom)} />
    </DisclosureButton>
  );
}

function Footer() {
  return (
    <footer className="grid place-content-center py-6 text-aztec-300">
      <small>Copyright © 2024 | All rights reserved</small>
    </footer>
  );
}
