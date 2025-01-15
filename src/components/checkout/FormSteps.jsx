"use client";

import { SmallLoading } from "@/app/(booking)/session/reservation/flow/checkout/loading";
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
      <SelectTickets error={errors} />
      <SelectCampingArea {...orderData} data={areas} />
      <GreenFee {...orderData} />
    </>
  );
}

export function BookingStepTwo({ orderData, errors, tickets, isBuyer }) {
  return (
    <>
      <EnterGuestData
        {...orderData}
        {...tickets}
        error={errors?.guests}
        isBuyer={isBuyer}
      />
      <SelectTents error={errors} />
    </>
  );
}

export function BookingStepThree({ errors, isBuyer, orderData }) {
  return (
    <>
      {!isBuyer && <EnterCustomerData {...orderData} error={errors} />}
      <EnterPaymentInfo {...orderData} error={errors?.cardDetails} />
    </>
  );
}
