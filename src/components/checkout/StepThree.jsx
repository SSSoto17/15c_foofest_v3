"use client";

import Form from "next/form";

import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import { keyEnter } from "@/lib/utils";
import { Field, Fieldset, Label, Legend, Input } from "@headlessui/react";
import { TextInput, CustomerField, ErrorText } from "./FormFields";

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
      {!orderData?.name && <EnterCustomerData {...orderData} error={errors} />}
      <EnterPaymentInfo {...orderData} error={errors?.cardDetails} />
      <FormFooter activeStep={activeStep} isPending={isPending} />
    </Form>
  );
}

function EnterCustomerData({ name, email, error }) {
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-5">Your Information</Legend>
      <CustomerField
        name="name"
        defaultValue={name}
        placeholder="e.g. John Doe"
        error={error?.name}
        errorIcon
        errorText
      >
        Name
      </CustomerField>
      <CustomerField
        name="email"
        defaultValue={email}
        placeholder="johndoe@gmail.com"
        error={error?.email}
        errorIcon
        errorText
      >
        Email
      </CustomerField>
    </Fieldset>
  );
}

import { MdOutlineError } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";

function EnterPaymentInfo({ error }) {
  const errorStyle =
    "not-data-focus:border-border-global--error bg-surface-input--focus";
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-5">Payment</Legend>
      {error && <ErrorText>{error}</ErrorText>}
      <div className="grid grid-cols-[6fr_1fr] gap-x-2 gap-y-4 max-w-lg">
        <Field className="grid gap-y-2">
          <Label>Card Number</Label>
          <Input
            name="cardNumber"
            placeholder="Card number"
            className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
              error && errorStyle
            }`}
          />
        </Field>
        <MdOutlineError
          aria-label="Attention!"
          className={`mr-4 place-self-center text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
        <div className="grid grid-cols-3 gap-x-4">
          <Field className="grid gap-y-2 col-span-2">
            <Input
              name="cardExp"
              placeholder="Expiration date ( MM / YY )"
              className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
                error && errorStyle
              }`}
            />
          </Field>
          <Field className="grid gap-y-2 relative">
            <Input
              name="cardSec"
              placeholder="CVC"
              className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
                error && errorStyle
              }`}
            />
            <div className="group absolute top-2 right-2">
              <FaRegQuestionCircle
                aria-label="Details"
                className=" cursor-pointer opacity-50 group-hover:opacity-100 transition-opacity duration-150"
                size="16"
              />
              <p className="opacity-0 group-hover:opacity-80 absolute left-6 -top-2 min-w-36 bg-aztec-950 px-2 py-1 body-copy-small text-aztec-300 rounded-xs border border-border-global">
                Three digits on the back of your card.
              </p>
            </div>
          </Field>
        </div>
        <MdOutlineError
          aria-label="Attention!"
          className={`mr-4 place-self-center text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
        <Field className="grid gap-y-2">
          <Input
            name="cardHolder"
            placeholder="Name on card"
            className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
              error && errorStyle
            }`}
          />
        </Field>
        <MdOutlineError
          aria-label="Attention!"
          className={`mr-4 place-self-center text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
      </div>
    </Fieldset>
  );
}
