"use client";
import { useState } from "react";
import { useEffect } from "react";

// Code used in this component, is from the article below by Michael Ojogbo.
// https://medium.com/@ojogbomichael/same-page-navigation-with-nextjs-bb99cccfda11
// Styling and more adjusted to fit our design

import { MdOutlineArrowUpward } from "react-icons/md";

const ScrollToButton = ({ children, scrollFromTop, simple }) => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: scrollFromTop, behavior: "smooth" });
  }

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 150) {
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

  return simple ? (
    <button className="cursor-pointer justify-self-center col-span-full" onClick={scrollToTop}>
      {children}
      {/* BACK TO TOP
      <MdOutlineArrowUpward className="inline-block h-4 w-4" /> */}
    </button>
  ) : (
    <button className={`fixed bottom-0 right-0 bg-aztec-300 text-forest-950 body-copy-small px-4 py-2 mr-10 mb-[48px] z-50 items-center flex gap-2 cursor-pointer opacity-0 ${isVisible && "opacity-100"}`} onClick={scrollToTop}>
      {children}
      <MdOutlineArrowUpward className="inline-block h-4 w-4" />
    </button>
  );
};

export default ScrollToButton;
