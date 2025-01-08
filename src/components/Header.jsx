"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../assets/svg/logo_bold.svg";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Description,
} from "@headlessui/react";
import { useState } from "react";
import { deleteUnpaid } from "@/lib/order";
import { redirect } from "next/navigation";

export default function Header({ linksActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`col-span-full bg-main-background drop-shadow-main z-50 ${
        isOpen && "fixed w-full px-4"
      }`}
    >
      <nav className="py-4 flex w-full items-center justify-between">
        {linksActive ? (
          <Link href="/">
            <Image src={logo} alt="FooFest" className="h-16 w-fit" />
          </Link>
        ) : (
          <WarningEscape />
        )}
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

function MobileNav({ setIsOpen, isOpen }) {
  const classes = `-z-10 overscroll-auto w-screen h-screen fixed inset-0 bg-[#171e1b] drop-shadow-main grid items-center justify-around transition-[left] duration-500 ease-in-out ${
    isOpen ? "left-0" : "left-full"
  }`;
  return (
    <nav className={classes}>
      <menu className=" text-2xl flow-space">
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
      </menu>
    </nav>
  );
}

function MobileNavIcon({ setIsOpen, isOpen }) {
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

function WarningEscape() {
  const [isOpen, setIsOpen] = useState(false);

  const handleExit = async () => {
    await deleteUnpaid();
    redirect("/");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <Image src={logo} alt="FooFest" className="h-16 w-fit" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-surface-global p-12 border border-border-global max-w-md">
          <DialogPanel className="grid gap-8">
            <DialogTitle className="heading-6 text-red-400">
              Leave Booking Session
            </DialogTitle>
            <div className="grid gap-2">
              <Description className="font-bold">
                Are you sure you wish to leave?
              </Description>
              <p className="text-aztec-300">
                If you exit the booking session you will lose your reservation.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="grow cursor-pointer bg-aztec-300 p-2 rounded-sm font-semibold max-w-40"
              >
                Cancel
              </button>
              <button
                onClick={handleExit}
                className="grow cursor-pointer bg-rose-600 p-2 rounded-sm font-semibold max-w-40"
              >
                Exit
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
