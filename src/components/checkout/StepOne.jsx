"use client";

// COMPONENTS
import { Fieldset, Legend } from "@headlessui/react";
import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import {
  QuantitySelector,
  RadioSelector,
  CheckField,
  ErrorText,
} from "./FormFields";
import Form from "next/form";

// FUNCTIONS

import { getCampingAreas } from "@/lib/order";
import { keyEnter } from "@/lib/utils";
import useTicketListing from "@/hooks/useTicketListing";
import useAvailableArea from "@/hooks/useAvailableArea";
import { useState } from "react";

export default function BookingStepOne({
  activeStep,
  errors,
  orderData,
  submit,
  isPending,
}) {
  const { areas, isLoading } = getCampingAreas();

  if (isLoading) return;

  return (
    <Form
      action={submit}
      onKeyDown={keyEnter}
      className="grid row-span-2 gap-y-10 sm:gap-y-16 p-8 sm:p-12"
    >
      <SelectTickets error={errors} />
      <SelectCampingArea data={areas} />
      <GreenFee {...orderData} />
      <FormFooter activeStep={activeStep} isPending={isPending} />
    </Form>
  );
}

function SelectTickets({ error }) {
  const ticketListing = useTicketListing(error);

  return (
    <Fieldset className="grid gap-y-4 max-w-xl">
      <Legend className="heading-5">Tickets</Legend>
      <ErrorText>{error?.tooFewTickets || error?.tooManyTickets}</ErrorText>
      {ticketListing.map((ticket, id) => {
        return (
          <QuantitySelector key={id} data={ticket}>
            {ticket.label}
          </QuantitySelector>
        );
      })}
    </Fieldset>
  );
}

function SelectCampingArea({ data }) {
  const [selected, setSelected, areaData] = useAvailableArea(data);

  return (
    <Fieldset className="grid gap-y-4 md:gap-y-6">
      <Legend className="heading-5">Camping Spot</Legend>
      <RadioSelector
        data={areaData}
        selected={selected}
        setSelected={setSelected}
      />
    </Fieldset>
  );
}

function GreenFee({ green_fee }) {
  const data = {
    name: "greenFee",
    price: 249,
    checked: green_fee,
  };
  return (
    <Fieldset className="grid gap-y-2">
      <CheckField data={data}>Green Fee</CheckField>
    </Fieldset>
  );
}
