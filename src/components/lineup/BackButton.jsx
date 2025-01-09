"use client";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { MdOutlineArrowBack } from "react-icons/md";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="cursor-pointer hover:text-aztec-200 flex gap-4 items-center mb-4 text-aztec-300">
      <span className="">
        <MdOutlineArrowBack />
      </span>
      Back
    </Button>
  );
};

export default BackButton;
