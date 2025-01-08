// "use client";

// import Form from "next/form";

// import BookingStepOne from "./StepOne";
// import { BookingStepTwo, BookingStepThree } from "./FormSteps";
// import { OrderSummary } from "./OrderSummary";

// import { useActionState } from "react";
// import { submitTicketReservation } from "@/app/session/reservation/flow/checkout/actions";
// import { keyEnter } from "@/lib/utils";

// export default function BookingForm({ areaData }) {
//   const initState = { activeStep: 1, success: false, errors: {} };
//   const [state, submitReservation, isPending] = useActionState(
//     submitTicketReservation,
//     initState
//   );

//   console.log(state?.orderDetails);

//   return (
//     <>
//       <Form
//         onKeyDown={keyEnter}
//         action={submitReservation}
//         className="grid md:grid-rows-subgrid md:col-span-3 md:row-span-full border border-border-form"
//       >
//         <FormHeader {...state} />
//         {state?.activeStep === 2 ? (
//           <BookingStepTwo
//             orderData={state?.orderDetails}
//             error={state?.errors}
//           />
//         ) : state?.activeStep === 3 ? (
//           <BookingStepThree
//             orderData={state?.orderDetails}
//             error={state?.errors}
//           />
//         ) : (
//           <BookingStepOne
//             areaData={areaData}
//             ticketData={state?.orderDetails}
//             error={state?.errors}
//           />
//         )}
//         <FormFooter
//           activeStep={state?.activeStep}
//           nextStep={submitReservation}
//           isPending={isPending}
//         />
//       </Form>
//       <OrderSummary step={state?.activeStep} {...state?.orderDetails} />
//     </>
//   );
// }
