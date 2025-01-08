"use client";

import Form from "next/form";

import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import { keyEnter } from "@/lib/utils";
import { Fieldset, Legend } from "@headlessui/react";
import { TextInput } from "./FormFields";
import buyerInfo from "../../data/buyerfields";

export default function BookingStepThree({
  submit,
  activeStep,
  isPending,
  errors,
  orderData,
}) {
  return (
    <Form
      action={submit}
      onKeyDown={keyEnter}
      className="grid row-span-2 gap-y-10 sm:gap-y-16 p-8 sm:p-12"
    >
      <EnterCustomerData {...orderData} error={errors} />
      <EnterPaymentInfo {...orderData} error={errors?.cardDetails} />
      <FormFooter activeStep={activeStep} isPending={isPending} />
    </Form>
  );
}

function EnterCustomerData({ name, email, error }) {
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-5">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return (
          <TextInput
            key={id}
            {...field}
            defaultValue={field.name === "name" ? name : email}
            error={field.name === "name" ? error?.name : error?.email}
          >
            {field.name}
          </TextInput>
        );
      })}
    </Fieldset>
  );
}

function EnterPaymentInfo({ error }) {
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-5">Payment</Legend>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-3 gap-x-4 max-w-lg">
        <TextInput
          name="cardNumber"
          type="tel"
          placeholder="Card number"
          variant="fullSpan"
        />
        <TextInput
          name="cardExp"
          type="text"
          placeholder="Expiration date ( MM / YY )"
          variant="twoSpan"
        />
        <TextInput name="cardSec" type="number" placeholder="Security code" />
        <TextInput
          name="cardHolder"
          type="text"
          placeholder="Name on card"
          variant="fullSpan"
        />
      </div>
    </Fieldset>
  );
}
