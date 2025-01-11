"use client";

import { SmallLoading } from "@/app/session/reservation/flow/checkout/loading";
import {
  SelectTickets,
  SelectCampingArea,
  GreenFee,
  EnterGuestData,
  SelectTents,
  EnterCustomerData,
  EnterPaymentInfo,
} from "./FormSections";
import { getCampingAreas } from "@/lib/order";

export function BookingStepOne({ orderData, errors }) {
  const { areas, isLoading } = getCampingAreas();

  if (isLoading) return <SmallLoading />;

  return (
    <>
      {/* <div className="grid gap-y-12 justify-content-start"> */}
      <SelectTickets error={errors} />
      <SelectCampingArea {...orderData} data={areas} />
      <GreenFee {...orderData} />
      {/* </div> */}
    </>
  );
}

export function BookingStepTwo({ orderData, errors, tickets }) {
  return (
    <div className="grid gap-y-12 justify-content-start">
      <EnterGuestData {...orderData} {...tickets} error={errors?.guests} />
      <SelectTents error={errors} />
    </div>
  );
}

export function BookingStepThree({ errors, orderData }) {
  return (
    <div className="grid gap-y-12 justify-content-start">
      {!orderData?.name && <EnterCustomerData {...orderData} error={errors} />}
      <EnterPaymentInfo {...orderData} error={errors?.cardDetails} />
    </div>
  );
}
