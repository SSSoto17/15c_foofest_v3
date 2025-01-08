"use client";

import Form from "next/form";
import Image from "next/image";

import { Fieldset, Legend } from "@headlessui/react";
import {
  QuantitySelector,
  TextInput,
  CheckField,
  ErrorText,
} from "@/components/checkout/FormFields";
import Accordion from "../Accordion";
import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import { keyEnter } from "@/lib/utils";

import vipStamp from "@/assets/svg/vip.svg";
import useTentListing from "@/hooks/useTentListing";

export default function BookingStepTwo({
  submit,
  activeStep,
  isPending,
  errors,
  tickets,
}) {
  return (
    <Form
      action={submit}
      onKeyDown={keyEnter}
      className="grid row-span-2 gap-y-10 sm:gap-y-16 p-8 sm:p-12"
    >
      <EnterGuestData {...tickets} error={errors?.guests} />
      <SelectTents error={errors} />
      <FormFooter activeStep={activeStep} isPending={isPending} />
    </Form>
  );
}

function EnterGuestData({ keys, data, error }) {
  return (
    <section
      className={`grid ${keys.length > 1 && "md:grid-cols-2"} gap-4 w-full`}
    >
      <header className="col-span-full grid gap-2">
        <h2 className="heading-5">Ticket Information</h2>
      </header>
      {keys.map((key, id) => {
        return (
          <TicketGuestCard
            key={id}
            {...key}
            data={data && data[id]}
            number={id + 1}
            single={keys.length === 1}
            error={error}
          />
        );
      })}
    </section>
  );
}

function TicketGuestCard({
  keyName,
  keyEmail,
  vip,
  data,
  number,
  single,
  error,
}) {
  const checkboxData = { name: "isBuyer" };
  return (
    <>
      <Fieldset className="grid gap-y-6 max-w-md grow shrink">
        <Legend className="heading-6 font-semibold capitalize flex gap-4">
          Ticket #{number}
        </Legend>
        <div
          className={`grid gap-y-4 border p-6 md:p-8 pt-4 relative ${
            (error?.name && !data?.name) || (error?.email && !data?.email)
              ? "border-border-global--error/35"
              : "border-border-input"
          }`}
        >
          {vip && (
            <Image
              src={vipStamp}
              alt="VIP Ticket"
              className="absolute right-6 -top-6"
            />
          )}
          <TextInput
            name={keyName}
            error={error?.name && !data?.name ? error?.name : null}
            defaultValue={data?.name}
            type="text"
            variant="slim"
          >
            Name
          </TextInput>
          <TextInput
            name={keyEmail}
            error={error?.email && !data?.email ? error?.email : null}
            defaultValue={data?.email}
            type="email"
            variant="slim"
          >
            Email
          </TextInput>
        </div>
        {single && (
          <CheckField data={checkboxData} minor>
            Are you buying this ticket for yourself?
          </CheckField>
        )}
      </Fieldset>
    </>
  );
}

function SelectTents({ error }) {
  const tentListing = useTentListing(error);

  return (
    <Accordion label="Tent Setup" variant="secondary">
      <Fieldset className="grid gap-y-3 ml-12">
        <ErrorText>{error?.tentSetup}</ErrorText>
        {tentListing.map((tent, id) => {
          return (
            <QuantitySelector key={id} data={tent}>
              {tent.label}
            </QuantitySelector>
          );
        })}
      </Fieldset>
    </Accordion>
  );
}
