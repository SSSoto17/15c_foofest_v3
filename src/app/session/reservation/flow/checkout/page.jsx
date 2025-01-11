"use client";

// FUNCTIONS || NEXT
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
import { submitOrder } from "@/app/session/reservation/flow/checkout/actions";
import { keyEnter } from "@/lib/utils";

// STORE
import { useSessionActions } from "@/store/SessionStore";
import { useOrderActions } from "@/store/OrderStore";

// import BookingWindow from ;
import OrderSummary from "@/components/checkout/OrderSummary";

export default function Page() {
  // FORM ACTION
  const initState = { step: 1, success: false, errors: {} };
  const [state, submit, isPending] = useActionState(submitOrder, initState);

  function handleSubmit(e) {
    e.preventDefault();
    const handler = e.nativeEvent.submitter.name;
    const formData = new FormData(e.target);
    if (handler === "back") {
      formData.append("isGoingBack", true);
    }
    if (state?.step === 3 && handler === "next") {
      // <ProcessingOrder />;
    }
    startTransition(() => submit(formData));
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

  // SUBMISSION REDIRECT
  const router = useRouter();
  if (state?.success) {
    router.push("/session/reservation/success");
  }

  // if (state?.step === 3 && isPending) return <ProcessingOrder />;

  return (
    <main>
      {/* <ProcessingOrder /> */}
      {/* {state?.orderData?.paid && isPending && <ProcessingOrder />} */}
      <Form
        onSubmit={handleSubmit}
        onKeyDown={keyEnter}
        className="grid gap-x-4 grid-rows-[auto_1fr_auto] md:grid-cols-4 h-full"
      >
        <BookingWindow state={state} isPending={isPending}>
          {state?.step === 1 && <BookingStepOne {...state} />}
          {state?.step === 2 && <BookingStepTwo {...state} />}
          {state?.step === 3 && <BookingStepThree {...state} />}
        </BookingWindow>
        <OrderSummary {...state} />
      </Form>
    </main>
  );
}
