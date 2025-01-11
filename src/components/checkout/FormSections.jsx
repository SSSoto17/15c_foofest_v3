"use client";

// COMPONENTS
import Image from "next/image";
import { Fieldset, Field, Legend, Label, Input } from "@headlessui/react";
import {
  QuantitySelector,
  RadioSelector,
  CheckField,
  ErrorText,
  CustomerField,
} from "./FormFields";
import Accordion from "../Accordion";

// FUNCTIONS
import { useEffect, useState } from "react";

// STORE
import useAvailableArea from "@/hooks/useAvailableArea";
import useTicketListing from "@/hooks/useTicketListing";
import useTentListing from "@/hooks/useTentListing";

// ASSETS
import vipStamp from "@/assets/svg/vip.svg";

// BOOKING || STEP ONE
export function SelectTickets({ error }) {
  const ticketListing = useTicketListing(error);

  return (
    <Fieldset className="grid grid-rows-[auto_1rem] gap-y-4 max-w-xl">
      <Legend className="heading-5">Tickets</Legend>
      <ErrorText>
        {ticketListing[0].overallTotal < 1 &&
          error &&
          (error?.tooFewTickets || error?.tooManyTickets)}
      </ErrorText>
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

export function SelectCampingArea({ camping_area, data }) {
  const [selected, setSelected, areaData] = useAvailableArea(
    data,
    camping_area
  );

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

export function GreenFee({ green_fee }) {
  const data = {
    name: "greenFee",
    price: 249,
  };
  return (
    <Fieldset className="grid gap-y-2">
      <CheckField data={data} savedState={green_fee}>
        Green Fee
      </CheckField>
    </Fieldset>
  );
}

// BOOKING || STEP TWO
export function EnterGuestData({ name, keys, data, error }) {
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
          <GuestCard
            key={id}
            {...key}
            data={data && data[id]}
            number={id + 1}
            single={keys.length === 1}
            error={error}
            savedState={name ? true : false}
          />
        );
      })}
    </section>
  );
}

function GuestCard({
  savedState,
  keyName,
  keyEmail,
  vip,
  data,
  number,
  single,
  error,
}) {
  const [isBuyer, setIsBuyer] = useState(savedState || false);
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
            Use for payment information
          </CheckField>
        )}
      </Fieldset>
    </>
  );
}

export function SelectTents({ error }) {
  const tentListing = useTentListing(error);
  const totalTickets = getTotalQuantity("tickets");
  const { setDouble, setTriple } = useTentActions();

  useEffect(() => {
    setDouble(0);
    setTriple(0);
  }, [totalTickets]);

  return (
    <Accordion label="Tent Setup" variant="secondary" optional>
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

// BOOKING || STEP THREE
export function EnterCustomerData({ name, email, error }) {
  return (
    <Fieldset className="grid gap-y-4 max-w-sm">
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

import DinersClub from "@/assets/svg/payment/dinersclub.svg";
import MasterCard from "@/assets/svg/payment/mastercard.svg";
import Visa from "@/assets/svg/payment/visa.svg";
import { getTotalQuantity } from "@/lib/utils";
import { useTentActions } from "@/store/TentStore";

function PaymentMethods() {
  // ICON CREDIT: https://www.figma.com/community/file/880472656109554171
  return (
    <div className="flex gap-1">
      <Image src={MasterCard} alt="Mastercard" className="w-10" />
      <Image src={Visa} alt="Visa" className="w-10" />
      <Image
        src={DinersClub}
        alt="Diners Club International"
        className="w-10"
      />
    </div>
  );
}

export function EnterPaymentInfo({ error }) {
  const errorStyle =
    "not-data-focus:border-border-global--error bg-surface-input--focus";
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-5 flex justify-between max-w-md">
        Payment Details
      </Legend>
      {error && <ErrorText>{error}</ErrorText>}
      <div className="grid grid-cols-[6fr_1fr] gap-x-2 gap-y-4 max-w-lg">
        <Field className="grid gap-y-2">
          <div className="flex gap-x-2 justify-between items-end">
            <Label className="body-copy-small">Card Number</Label>
            <PaymentMethods />
          </div>
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
          className={`m-2 self-end text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
        <div className="grid grid-cols-3 gap-x-4">
          <Field className="grid col-span-2 gap-y-2">
            <Label className="body-copy-small">Expiry Date</Label>
            <Input
              name="cardExp"
              placeholder="( MM / YY )"
              className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
                error && errorStyle
              }`}
            />
          </Field>
          <Field className="grid gap-y-2 relative">
            <Label className="body-copy-small">Security code</Label>
            <Input
              name="cardSec"
              placeholder="CVC"
              className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
                error && errorStyle
              }`}
            />
            <div className="group absolute top-10 right-2">
              <FaRegQuestionCircle
                aria-label="Details"
                className=" cursor-pointer opacity-50 group-hover:opacity-100 transition-opacity duration-150"
                size="16"
              />
              <p className="opacity-0 group-hover:opacity-100 body-copy-small absolute left-8 -top-4 min-w-64 bg-aztec-950 px-2 py-1 body-copy-small text-aztec-300 rounded-xs border border-border-global">
                The card security code is a three digit number on the back of
                your card.
              </p>
            </div>
          </Field>
        </div>
        <MdOutlineError
          aria-label="Attention!"
          className={`m-2 self-end text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
        <Field className="grid gap-y-2">
          <Label className="body-copy-small">Card Holder</Label>
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
          className={`m-2 self-end text-text-global--error opacity-0 ${
            error && "opacity-100"
          }`}
          size="24"
        />
      </div>
    </Fieldset>
  );
}
