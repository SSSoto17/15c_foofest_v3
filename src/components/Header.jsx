"use client";

import Link from "next/link";

import { useState } from "react";

export default function Header({ children, linksActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`col-span-full bg-main-background drop-shadow-main z-50 ${
        isOpen && "fixed w-full px-4"
      }`}
    >
      <nav className="py-4 flex w-full items-center justify-between">
        {children}
        {linksActive && (
          <>
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
            <MobileNavIcon setIsOpen={setIsOpen} isOpen={isOpen} />
          </>
        )}
      </nav>
      <MobileNav setIsOpen={setIsOpen} isOpen={isOpen} />
    </header>
  );
}

export function MobileNav({ setIsOpen, isOpen, children }) {
  const classes = `-z-10 overscroll-auto w-screen h-screen fixed inset-0 bg-[#171e1b] drop-shadow-main grid items-center justify-around transition-[left] duration-500 ease-in-out ${
    isOpen ? "left-0" : "left-full"
  }`;
  return (
    <nav className={classes}>
      <ul className=" text-2xl flow-space">
        {children}
        <li>
          <Link
            className="py-2 px-6 grid place-content-center uppercase font-semibold"
            href="/lineup/artists"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Lineup 2025
          </Link>
        </li>
        <li>
          <Link
            className="border-2 border-forest-600 bg-forest-600 py-2 px-6 grid place-content-center uppercase font-bold"
            href="/session/reservation/flow/checkout"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Buy Tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function MobileNavIcon({ setIsOpen, isOpen }) {
  const role = {
    top: `transition-[transform] ${
      isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-0.5"
    }`,
    middle: `transition-[opacity] my-1 ${isOpen ? "opacity-0" : "opacity-100"}`,
    bottom: `transition-[transform] ${
      isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0.5"
    }`,
  };

  function setClasses(role) {
    return (
      "bg-forest-100 block duration-300 ease-out h-0.5 w-6 rounded-sm z-100 " +
      role
    );
  }

  return (
    <button
      aria-label="Navigation"
      className="md:hidden"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <span className={setClasses(role.top)}></span>
      <span className={setClasses(role.middle)}></span>
      <span className={setClasses(role.bottom)}></span>
    </button>
  );
}
