"use client";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

export default function Accordion({
  label,
  variant,
  name,
  optional,
  children,
  isOpen,
}) {
  const variants = {
    primary: "heading-4",
    secondary: "body-copy font-bold",
  };
  const router = useRouter();
  const path = usePathname();
  // const [isOpen, setIsOpen] = useState(false);
  function handleClick(e) {
    const target = e.target;
    console.log(target);
    router.push(`${path}?day=${label}`, { scroll: false });

    // redirect(`${path}?day=${label}`, { scroll: false });
  }

  return (
    <details
      open={isOpen}
      name={name}
      className="group border-2 border-border-global px-4 py-6 md:p-6"
    >
      <summary
        onClick={handleClick}
        className={`cursor-pointer flex items-center justify-between gap-4 ${variants[variant]}`}
      >
        <div
          className={`flex items-center gap-4 grow ${
            variant === "primary" && "justify-between"
          }`}
        >
          <MdAdd
            size="2rem"
            className={`duration-300 ease-in-out group-open:rotate-45 ${
              variant === "primary" && "order-2"
            }`}
          />
          {label}
        </div>
        {optional && (
          <span className="body-copy-small font-bold uppercase opacity-50 justify-self-end -mr-10">
            Optional
          </span>
        )}
      </summary>
      {children}
    </details>
  );
}
