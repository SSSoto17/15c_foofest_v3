"use client";

import Form from "next/form";
import Image from "next/image";

import { Fieldset, Legend } from "@headlessui/react";
import {
  QuantitySelector,
  CheckField,
  ErrorText,
  CustomerField,
} from "@/components/checkout/FormFields";
import Accordion from "../Accordion";
import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import { keyEnter } from "@/lib/utils";
import { useState } from "react";

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
      onSubmit={submit}
      onKeyDown={keyEnter}
      className={`${
        isPending && "opacity-60"
      } grid row-span-2 gap-y-10 sm:gap-y-16 p-8 sm:p-12`}
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
        <ErrorText>{error?.name || error?.email}</ErrorText>
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
  const [isBuyer, setIsBuyer] = useState(false);
  const checkboxData = {
    name: "isBuyer",
    state: isBuyer,
    onChange: setIsBuyer,
  };
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
          <CustomerField
            name={keyName}
            error={error?.name && data?.name?.length < 2 ? error?.name : null}
            defaultValue={data?.name}
          >
            Name
          </CustomerField>
          <CustomerField
            name={keyEmail}
            error={
              isBuyer &&
              error?.email &&
              (!data?.email?.includes("@") || !data?.email?.includes("."))
                ? error?.email
                : null
            }
            defaultValue={data?.email}
          >
            Email{" "}
            {!isBuyer && (
              <span className="body-copy-small opacity-75">(Optional)</span>
            )}
          </CustomerField>
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
        {tentListing
          .filter((tent) => tent.display === true)
          .map((tent, id) => {
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
