"use client";
import { Button } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack, MdOutlineArrowUpward } from "react-icons/md";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="cursor-pointer body-copy uppercase font-bold py-4 transition-all duration-150 text-aztec-400  hover:text-aztec-300 hover:scale-105 flex gap-2 items-center"
    >
      <MdOutlineArrowBack />
      Back
    </Button>
  );
};

// Code used in this component, is from the article below by Michael Ojogbo.
// https://medium.com/@ojogbomichael/same-page-navigation-with-nextjs-bb99cccfda11
// Styling and more adjusted to fit our design

export function ScrollToButton({ children, scrollFromTop, simple }) {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: scrollFromTop, behavior: "smooth" });
  }

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 350) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      aria-label="Back to Top"
      className={`fixed m-12 bottom-0 right-0 rounded-full bg-forest-600 drop-shadow-2xl body-copy font-bold p-4 z-30 cursor-pointer hover:scale-105 transition-all duration-150 opacity-0 ${
        isVisible && "opacity-100"
      }`}
      // className={`fixed bottom-0 right-0 bg-aztec-300 text-forest-950 body-copy-small px-4 py-2 mr-10 mb-[48px] z-50 items-center flex gap-2 cursor-pointer opacity-0 ${
      //   isVisible && "opacity-100"
      // }`}
      onClick={scrollToTop}
    >
      {/* {children} */}
      <MdOutlineArrowUpward size="24" />
    </button>
  );
}
