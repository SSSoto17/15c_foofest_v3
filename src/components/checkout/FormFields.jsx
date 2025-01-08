// COMPONENTS
import {
  Field,
  Label,
  Input,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
} from "@headlessui/react";
import {
  MdOutlineAdd,
  MdOutlineRemove,
  MdOutlineDelete,
  MdOutlineError,
  MdOutlineCheck,
} from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";

// FUNCTIONS
import { useState, useEffect } from "react";

// NUMBER SPINNER
export function QuantitySelector({ data, children }) {
  return (
    <Field className="peer grid grid-cols-1 sm:grid-cols-[1fr_auto_1rem] items-end justify-between gap-2 sm:gap-4">
      <Label className="body-copy flex justify-between">
        {children}
        <span className="body-copy opacity-50 place-self-end mx-8">
          {data.price} DKK
        </span>
      </Label>
      <Spinner
        // forTickets
        {...data}
      />
    </Field>
  );
}

function Spinner({
  name,
  label,
  error,
  single,
  currentTotal,
  setTotal,
  overallTotal,
}) {
  const [quantity, setQuantity] = useState(currentTotal);

  useEffect(() => {
    setTotal(quantity);
  }, [quantity]);

  return (
    <>
      <div
        className={`input-field input-field-number--focus flex justify-between gap-4 w-fit ${
          ((error?.includes("select") && overallTotal < 1) ||
            (error?.includes("limit") && currentTotal > 10) ||
            error?.tentSetup) &&
          "not-has-data-focus:border-border-global--error bg-surface-input--focus"
        }`}
      >
        <Button
          disabled={!quantity}
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(Number(quantity) - 1)}
        >
          <MdOutlineRemove className="text-text-global" size="24" />
        </Button>
        <Input
          type="number"
          name={name}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="body-copy w-6 text-center data-focus:outline-none data-disabled:text-text-global/15"
          disabled={label.includes("Triple") && single}
        />
        <Button
          disabled={
            label.includes("Double") && single
              ? quantity >= 1
              : label.includes("Triple") && single
              ? quantity >= 0
              : quantity >= 10
          }
          className="data-disabled:opacity-25 not-data-disabled:cursor-pointer"
          onClick={() => setQuantity(Number(quantity) + 1)}
        >
          <MdOutlineAdd className="text-text-global" size="24" />
        </Button>
      </div>
      {quantity > 0 && (
        <Button
          className="cursor-pointer"
          aria-label="Clear quantity"
          onClick={() => setQuantity(0)}
        >
          <MdOutlineDelete
            className="hover:opacity-50 opacity-25 place-self-center hidden md:block"
            size="24"
          />
        </Button>
      )}
      {error && overallTotal < 1 && (
        <MdOutlineError
          aria-label="Attention!"
          className="place-self-center text-text-global--error error_icon"
          size="24"
        />
      )}
    </>
  );
}

// RADIO GROUP
export function RadioSelector({ data, selected, setSelected }) {
  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {data.map((option, id) => (
        <Field
          key={id}
          disabled={option.disabled}
          className="flex items-end justify-between max-w-xl gap-6 md:gap-8 not-data-disabled:cursor-pointer"
        >
          <Radio
            value={option.label}
            className="group grid grid-cols-[auto_8rem_4rem] gap-3 items-center"
          >
            <span className="input-radio" />
            <Label className="body-copy group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer">
              {option.label}
            </Label>
            <small className="body-copy-small opacity-25 cursor-default justify-self-end">
              {option.details}
            </small>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}

// CHECKBOX
export function CheckField({ data, minor, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <Field className="flex items-center gap-2 md:gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        name={data?.name}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label
        className={`body-copy text-res-sm md:text-res-base flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer ${
          minor && "body-copy-small text-aztec-300"
        }`}
      >
        {children}{" "}
        {data?.price && (
          <span className=" opacity-50 place-self-end mx-8">
            {data?.price} DKK
          </span>
        )}
      </Label>
    </Field>
  );
}

// TEXT INPUT
export function TextInput({
  name,
  type,
  placeholder,
  defaultValue,
  error,
  children,
  variant,
}) {
  const variants = {
    fullSpan: "col-span-3",
    twoSpan: "col-span-2",
  };
  return (
    <Field
      className={`grid gap-y-2 ${variant ? variants[variant] : "max-w-sm"}`}
    >
      <Label
        className={`body-copy capitalize ${variant === "slim" && "opacity-65"}`}
      >
        {children}
      </Label>
      <div
        className={`grid ${
          variant !== "twoSpan" && "grid-cols-[1fr_auto]"
        } gap-y-4 relative`}
      >
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
            variant === "slim" && "py-1"
          } ${
            error &&
            !defaultValue &&
            "not-data-focus:border-border-global--error bg-surface-input--focus"
          }`}
        />
        {variant !== "twoSpan" && (
          <div className="w-6 hidden md:block">
            {error && !defaultValue && variant !== "slim" && (
              <MdOutlineError
                aria-label="Attention!"
                className="mr-4place-self-center text-text-global--error"
                size="24"
              />
            )}
          </div>
        )}
      </div>
      {(variant != "slim" || variant != "twoSpan") && (
        <ErrorText>{!error?.includes("ticket") && error}</ErrorText>
      )}
    </Field>
  );
}

// ERROR TEXT
export function ErrorText({ retainHeight, children }) {
  return (
    <small
      className={`body-copy-small text-red-200 italic ${retainHeight && "h-6"}`}
    >
      {children}
    </small>
  );
}
