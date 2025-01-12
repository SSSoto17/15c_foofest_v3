"use client";

import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Description,
  Button,
} from "@headlessui/react";

// ASSETS
import { MdArrowLeft } from "react-icons/md";

import { useState } from "react";
import { redirect } from "next/navigation";
import { deleteUnpaid } from "@/lib/order";

export function WarningEscape() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer body-copy flex items-center py-2 hover:opacity-80"
      >
        <MdArrowLeft size="32" />
        Back
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md backdrop-grayscale-25 backdrop-brightness-50 z-50"
      >
        <Modal />
      </Dialog>
    </>
  );
}

function Modal() {
  const handleExit = async () => {
    await deleteUnpaid();
    redirect("/");
  };
  return (
    <div className="bg-surface-global p-12 border border-border-global rounded-sm max-w-md">
      <DialogPanel className="grid gap-6">
        <div className="grid gap-2">
          <DialogTitle className="heading-6">Leave Booking Session</DialogTitle>
          <Description className="text-aztec-300">
            If you exit the booking session you will lose your reservation.
          </Description>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="grow cursor-pointer body-copy bg-aztec-300 hover:bg-aztec-400 p-2 rounded-sm font-semibold max-w-40"
          >
            Cancel
          </button>
          <button
            onClick={handleExit}
            className="grow cursor-pointer body-copy bg-rose-600 hover:bg-rose-500 p-2 rounded-sm font-semibold max-w-40"
          >
            Exit
          </button>
        </div>
      </DialogPanel>
    </div>
  );
}
