import BookingWindow from "@/components/checkout/BookingWindow";
import OrderSummary from "@/components/checkout/OrderSummary";
import ReservationTimer from "@/components/checkout/ReservationTimer";
import Button from "@/components/Button";
import formSteps from "@/data/formsteps";

export default function Page() {
  return (
    <main className="grid gap-x-4 grid-rows-[auto_1fr_auto] md:grid-cols-4">
      <BookingWindow />
      <OrderSummary />
    </main>
  );
}

export function FormHeader({ activeStep }) {
  return (
    <>
      <header
        className={`border-b border-border-form py-8 px-12 ${
          activeStep === 3 ? "hidden md:block" : "block"
        }`}
      >
        <ol className="sm:flex justify-center sm:justify-between items-center gap-4 font-semibold cursor-default">
          {formSteps.map((step, id) => (
            <FormStepIndicator activeStep={activeStep} {...step} key={id} />
          ))}
        </ol>
      </header>

      <div className={activeStep === 1 ? "hidden" : "block sm:hidden"}>
        {activeStep !== 1 && <ReservationTimer />}
      </div>
    </>
  );
}

function FormStepIndicator({ activeStep, step, title }) {
  return (
    <>
      <li
        key={crypto.randomUUID()}
        className="hidden first-of-type:hidden sm:block w-10 h-0.5 bg-aztec-800"
      />
      <li
        {...(activeStep >= step && {
          "data-active": true,
        })}
        className={`group body-copy font-semibold flex items-center gap-4 place-content-center sm:justify-between ${
          activeStep === step
            ? "text-text-global"
            : "text-text-global--disabled hidden sm:flex"
        }`}
      >
        <span className="body-copy-small grid place-content-center w-6 sm:w-8 rounded-full aspect-square text-text-global bg-surface-action--disabled group-data-active:bg-surface-action">
          {step}
        </span>{" "}
        {title}
      </li>
    </>
  );
}

export function FormFooter({ activeStep, isPending }) {
  return (
    <footer className="self-end flex justify-center sm:justify-end gap-4 items-end">
      {/* {activeStep > 1 && (
        <Button
          variant="primary"
          size="base"
          formAction={() => navigateStep(activeStep - 1)}
          isDisabled={isPending}
        >
          Back
        </Button>
      )} */}
      <Button variant="primary" size="base" isDisabled={isPending}>
        {activeStep === 3 ? "Purchase" : "Next"}
      </Button>
    </footer>
  );
}
