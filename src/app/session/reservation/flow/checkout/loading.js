"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import Button from "@/components/Button";

export default function Loading() {
  return (
    <section className="cursor-default h-full flex gap-4 self-center items-center place-self-center">
      <ImSpinner2 size="32" className="loaderIcon" />
      <p className="heading-5 animate-pulse">Loading</p>
    </section>
  );
}

export function SmallLoading() {
  return (
    <section className="cursor-default flex gap-4 items-center content-center justify-self-center self-stretch">
      <ImSpinner2 size="20" className="loaderIcon" />
      <p className="body-copy animate-pulse">Loading</p>
    </section>
  );
}

import { PiLockBold } from "react-icons/pi";
export function ProcessingOrder() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        name="purchase"
        type="submit"
        variant="form"
        size="base"
        // isDisabled={isPending}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex gap-2 place-content-center items-center relative">
          <PiLockBold size="20" />
          <p>Purchase</p>
        </div>
      </Button>
      {/* <section className="cursor-default fixed inset-0 overscroll-contain flex place-content-center place-items-center gap-6 backdrop-blur-md backdrop-grayscale-25 backdrop-brightness-50 z-50">
      <ImSpinner2 size="32" className="loaderIcon" />
      <p className="heading-5 animate-pulse">Processing order...</p>
    </section> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md backdrop-grayscale-25 backdrop-brightness-50"
      >
        <DialogPanel>
          <DialogTitle className="flex gap-6 cursor-default">
            <ImSpinner2 size="32" className="loaderIcon" />
            <p className="heading-5">Processing Order...</p>
          </DialogTitle>
        </DialogPanel>
      </Dialog>
    </>
  );
}
