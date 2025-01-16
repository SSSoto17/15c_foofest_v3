"use client";

// COMPONENTS
import Form from "next/form";
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Button,
} from "@headlessui/react";

// FUNCTIONS
import { redirect } from "next/navigation";
import { useState } from "react";

// ASSETS
import { MdArrowRight, MdOutlineCheck } from "react-icons/md";

export default function Filter({ active, genres }) {
  return (
    <aside className="@container sm:row-span-full">
      <Disclosure>
        <DisclosureButton className="group cursor-pointer flex items-center border-2 border-border-global p-2 heading-6 text-res-base w-full">
          <MdArrowRight
            size="32"
            className="group-data-open:rotate-90 transition-all duration-200"
          />
          Filter By Genre
        </DisclosureButton>
        <FilterList genres={genres} selected={active} />
      </Disclosure>
    </aside>
  );
}

function FilterList({ genres, selected }) {
  return (
    <DisclosurePanel className="@container border-2 border-t-0 border-border-global p-4">
      <Form action="/lineup/artists" className="grid gap-4">
        <ul className="grid gap-1">
          {genres.map((genreName, i) => {
            const isActive = Array.isArray(selected)
              ? selected?.find((genre) => genre === genreName)
              : selected === genreName;
            return (
              <li key={i}>
                <CheckField active={isActive}>{genreName}</CheckField>
              </li>
            );
          })}
        </ul>
        <FilterButtons />
      </Form>
    </DisclosurePanel>
  );
}

function FilterButtons() {
  function handleClear() {
    redirect("/lineup/artists");
  }
  return (
    <footer className="flex gap-2 justify-center @sm:gap-6">
      <Button
        type="submit"
        formAction={handleClear}
        className="button button-size-sm button-tertiary--disabled"
      >
        Clear all
      </Button>
      <Button type="submit" className="button button-size-sm button-tertiary">
        Apply
      </Button>
    </footer>
  );
}

function CheckField({ active, children }) {
  const [checked, setChecked] = useState(active || false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group">
      <Checkbox
        name="genre"
        value={children}
        checked={checked}
        onChange={setChecked}
        className="input-checkbox"
      >
        <MdOutlineCheck className="opacity-0 group-has-data-checked:opacity-100" />
      </Checkbox>
      <Label className="body-copy-small md:text-res-base text-aztec-300 flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer">
        {children}
      </Label>
    </Field>
  );
}
