// COMPONENTS
import ReservationTimer from "@/components/checkout/ReservationTimer";
import Button from "@/components/Button";
import formSteps from "@/data/formsteps";

// ASSETS
import { CgSpinner } from "react-icons/cg";
import { PiLockBold } from "react-icons/pi";

export default function BookingWindow({ state, isPending, children }) {
  return (
    <section className="grid md:grid-rows-subgrid md:col-span-3 md:row-span-full border border-border-form">
      <FormHeader {...state} isPending={isPending} />
      <article
        className={`${
          isPending && "animate-pulse"
        } grid gap-y-12 sm:gap-y-14 p-8 sm:p-12 content-start`}
      >
        {children}
      </article>
      <FormFooter {...state} isPending={isPending} />
    </section>
  );
}

function FormHeader({ step, isPending }) {
  return (
    <>
      <header
        className={`border-b border-border-form py-8 px-12 ${
          step === 3 ? "hidden md:block" : "block"
        }`}
      >
        <ol className="sm:flex justify-center sm:justify-between items-center gap-4 font-semibold cursor-default">
          {formSteps.map((obj, id) => (
            <FormStepIndicator
              active={step}
              {...obj}
              key={id}
              isPending={isPending}
            />
          ))}
        </ol>
      </header>

      <div className={step === 1 ? "hidden" : "block sm:hidden"}>
        {step !== 1 && <ReservationTimer />}
      </div>
    </>
  );
}

function FormStepIndicator({ active, step, title }) {
  return (
    <>
      <li
        key={crypto.randomUUID()}
        className="hidden first-of-type:hidden sm:block w-10 h-0.5 bg-aztec-800"
      />
      <li
        {...(active >= step && {
          "data-active": true,
        })}
        className={`group body-copy font-semibold flex items-center gap-4 place-content-center sm:justify-between ${
          active === step
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

function FormFooter({ step, isPending }) {
  // const { isPending, data, method, action } = useFormStatus();
  // console.log(data);
  return (
    <footer
      className={`pb-8 px-12 self-end flex justify-center ${
        step > 1 ? "sm:justify-between" : "sm:justify-end"
      } gap-4 items-end`}
    >
      {step > 1 && (
        <Button
          name="back"
          type="submit"
          variant="primary"
          size="base"
          isDisabled={isPending}
        >
          <p className="flex gap-2 place-content-center items-center relative">
            Back{" "}
            {isPending && (
              <CgSpinner
                size="24"
                className="loaderIcon absolute inset-0 left-4"
              />
            )}
          </p>
        </Button>
      )}
      <Button
        name="next"
        type="submit"
        variant="form"
        size="base"
        isDisabled={isPending}
      >
        {step === 3 ? (
          <div className="flex gap-2 place-content-center items-center relative">
            <PiLockBold size="20" />
            <p>Purchase</p>
          </div>
        ) : (
          <p className="flex gap-2 place-content-center items-center relative">
            Next{" "}
            {isPending && (
              <CgSpinner
                size="24"
                className="loaderIcon absolute inset-0 left-4"
              />
            )}
          </p>
        )}
      </Button>
    </footer>
  );
}
