"use client";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { MdOutlineArrowBack } from "react-icons/md";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()}>
      <p className="flex gap-4 items-center mb-4 text-aztec-300">
        <span className="">
          <MdOutlineArrowBack />
        </span>
        Back
      </p>
    </Button>
  );
};

export default BackButton;
