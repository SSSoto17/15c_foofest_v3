"use client";

// COMPONENTS
import Loading, {
  ProcessingOrder,
} from "@/app/session/reservation/flow/checkout/loading";
const BookingStepOne = dynamic(() => import("./StepOne"), {
  loading: () => <Loading />,
});
import BookingStepTwo from "./StepTwo";
import BookingStepThree from "./StepThree";
import { FormHeader } from "@/app/session/reservation/flow/checkout/page";

// FUNCTIONS || NEXT
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// FUNCTIONS || REACT
import { useActionState, useEffect, startTransition } from "react";

// SERVER ACTION
import { submitOrder } from "@/app/session/reservation/flow/checkout/actions";

// STORE
import { useSessionActions } from "@/store/SessionStore";
import { useOrderActions } from "@/store/OrderStore";

export default function BookingWindow() {
  // FORM ACTION
  // const initState = { activeStep: 1, success: false, errors: {} };
  // const [state, submit, isPending] = useActionState(submitOrder, initState);

  const initState = { activeStep: 1, success: false, errors: {} };
  const [state, submit, isPending] = useActionState(submitOrder, initState);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
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
  }, [state]);

  // SUBMISSION REDIRECT
  const router = useRouter();
  if (state?.success) {
    router.push("/session/reservation/success");
  }

  return (
    <section className="grid md:grid-rows-subgrid md:col-span-3 md:row-span-full border border-border-form">
      {state?.activeStep === 3 && isPending && <ProcessingOrder />}
      <FormHeader {...state} isPending={isPending} />
      {state?.activeStep === 2 ? (
        <BookingStepTwo
          submit={handleSubmit}
          isPending={isPending}
          {...state}
        />
      ) : state?.activeStep === 3 ? (
        <BookingStepThree
          submit={handleSubmit}
          isPending={isPending}
          {...state}
        />
      ) : (
        <BookingStepOne
          submit={handleSubmit}
          isPending={isPending}
          {...state}
        />
      )}
    </section>
  );
}
