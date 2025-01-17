"use client";

// FUNCTIONS || NEXT
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

// FUNCTIONS || REACT
import { useActionState, startTransition, useEffect } from "react";

// COMPONENTS
import Form from "next/form";
import Loading, {
  ProcessingOrder,
} from "@/app/(booking)/session/reservation/flow/checkout/loading";
const BookingWindow = dynamic(
  () => import("@/components/checkout/BookingWindow"),
  {
    loading: () => <Loading />,
  }
);
import {
  BookingStepOne,
  BookingStepTwo,
  BookingStepThree,
} from "@/components/checkout/FormSteps";
import OrderSummary from "@/components/checkout/OrderSummary";

// SERVER ACTION
import {
  completeOrder,
  submitOrder,
} from "@/app/(booking)/session/reservation/flow/checkout/actions";
import { keyEnter } from "@/lib/utils";

export default function Page() {
  // FORM ACTION
  const initState = { step: 1, success: false, errors: {} };
  const [state, submit, isPending] = useActionState(submitOrder, initState);
  const [order, complete, processingOrder] = useActionState(completeOrder, {
    success: false,
  });

  // SUBMIT FORM
  function handleSubmit(e) {
    e.preventDefault();
    const handler = e.nativeEvent.submitter.name;
    const formData = new FormData(e.target);

    if (handler === "back") {
      formData.append("isGoingBack", true);
      startTransition(() => submit(formData));
    }
    if (handler === "next") {
      startTransition(() => submit(formData));
    }
    if (handler === "purchase") {
      startTransition(() => submit(formData));
    }
  }

  // SUBMISSION REDIRECT
  useEffect(() => {
    if (state?.success) {
      startTransition(() => complete());
    }
  }, [state]);

  if (order?.success) {
    redirect("/session/reservation/success");
  }

  return (
    <main className="mb-6">
      {processingOrder && <ProcessingOrder />}
      <Form
        onSubmit={handleSubmit}
        onKeyDown={keyEnter}
        className="grid gap-x-4 grid-rows-[auto_1fr_auto] md:grid-cols-3 lg:grid-cols-4 h-full"
      >
        <BookingWindow state={state} isPending={isPending}>
          {state?.step === 1 && <BookingStepOne {...state} />}
          {state?.step === 2 && <BookingStepTwo {...state} />}
          {state?.step === 3 && <BookingStepThree {...state} />}
        </BookingWindow>
        <OrderSummary {...state} isPending={isPending} />
      </Form>
    </main>
  );
}
