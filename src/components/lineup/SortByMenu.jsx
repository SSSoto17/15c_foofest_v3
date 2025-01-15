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
  CloseButton,
} from "@headlessui/react";

// FUNCTIONS
import { redirect } from "next/navigation";
import { useState } from "react";

// ASSETS
import { MdArrowRight, MdOutlineCheck } from "react-icons/md";

export default function Filter({ active, genres }) {
  return (
    <aside className="sm:row-span-full">
      <Disclosure>
        <DisclosureButton className="group cursor-pointer flex items-center border-2 border-border-global p-2 heading-6 text-res-base w-full">
          <MdArrowRight
            size="32"
            className="group-data-[open]:rotate-90 transition-all duration-150"
          />
          Filter By Genre
        </DisclosureButton>
        <DisclosurePanel className="grid gap-4 border-2 border-t-0 border-border-global p-4">
          <FilterList genres={genres} selected={active} />
        </DisclosurePanel>
      </Disclosure>
    </aside>
  );
}

function FilterList({ genres, selected }) {
  return (
    <Form action="/lineup/artists" className="grid gap-4">
      <ul className="grid gap-1">
        {genres.map((genreName, i) => {
          const isActive = Array.isArray(selected)
            ? selected?.find((genre) => genre === genreName)
            : selected === genreName;
          return (
            <li key={i}>
              <GenreCheckbox label={genreName} active={isActive} />
            </li>
          );
        })}
      </ul>
      <FilterButtons />
    </Form>
  );
}

function FilterButtons() {
  function handleClear() {
    redirect("/lineup/artists");
  }
  return (
    <footer className="flex justify-end gap-2">
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

function GenreCheckbox({ label, active }) {
  const [checked, setChecked] = useState((active && true) || false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group">
      <Checkbox
        name="genre"
        value={label}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none group-hover:cursor-pointer group-hover:bg-aztec-900"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label className="group-hover:cursor-pointer">{label}</Label>
    </Field>
  );
}
