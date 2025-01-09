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

// FUNCTIONS
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionActions } from "@/store/SessionStore";
import { submitOrder } from "@/app/session/reservation/flow/checkout/actions";
import { useOrderActions } from "@/store/orderStore";
import { startTransition } from "react";
import dynamic from "next/dynamic";
import { Processing } from "@/lib/utils";

export default function BookingWindow() {
  const router = useRouter();

  const initState = { activeStep: 1, success: false, errors: {} };
  const [state, submit, isPending] = useActionState(submitOrder, initState);
  const { setActiveStep, setReservationId } = useSessionActions();
  const { setOrderData } = useOrderActions();

  useEffect(() => {
    setActiveStep(state?.activeStep);
    setOrderData(state?.orderData);
    if (state?.activeStep === 2) {
      setReservationId(state?.orderData?.reservationId);
    }
  }, [state]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(() => submit(formData));
  }

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
