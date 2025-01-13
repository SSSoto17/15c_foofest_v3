"use client";

// FUNCTIONS || NEXT
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";

// FUNCTIONS || REACT
import { useActionState, useEffect, startTransition } from "react";

// COMPONENTS
import Form from "next/form";
import Loading, {
  ProcessingOrder,
} from "@/app/session/reservation/flow/checkout/loading";
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

// SERVER ACTION
import {
  completeOrder,
  submitOrder,
} from "@/app/session/reservation/flow/checkout/actions";
import { keyEnter, Processing } from "@/lib/utils";

// STORE
import { useSessionActions } from "@/store/SessionStore";
import { useOrderActions } from "@/store/OrderStore";

// import BookingWindow from ;
import OrderSummary from "@/components/checkout/OrderSummary";

export default function Page() {
  // FORM ACTION
  const initState = { step: 1, success: false, errors: {} };
  const [state, submit, isPending] = useActionState(submitOrder, initState);
  const [order, complete, processingOrder] = useActionState(completeOrder, {
    success: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    const handler = e.nativeEvent.submitter.name;
    const formData = new FormData(e.target);
    console.log(handler);
    if (handler === "back") {
      formData.append("isGoingBack", true);
      startTransition(() => submit(formData));
    }
    if (handler === "next") {
      startTransition(() => submit(formData));
    }
    if (handler === "purchase") {
      console.log(state.orderData);
      formData.append("orderData", state.orderData);
      console.log("complete order");
      startTransition(() => complete(formData));
    }
  }

  // STORE
  const { setActiveStep, setReservationId } = useSessionActions();
  const { setOrderData } = useOrderActions();

  // UPDATE STORES
  useEffect(() => {
    setActiveStep(state?.activeStep);
    setOrderData(state?.orderData);
    if (state?.activeStep === 2) {
      setReservationId(state?.orderData?.reservationId);
    }
  }, [state?.step]);

  console.log("order completed: ", order?.success);

  // SUBMISSION REDIRECT
  if (order?.success === true) {
    console.log("redirecting");
    redirect("/session/reservation/success");
  }

  return (
    <main className="mb-6">
      {(processingOrder || order?.success) && <ProcessingOrder />}
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
