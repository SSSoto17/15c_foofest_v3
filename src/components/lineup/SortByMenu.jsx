"use client";

// COMPONENTS
import Form from "next/form";
import Link from "next/link";
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

export default function SortByMenu({ active, genreNames }) {
  console.log("current filters: ", active);
  return (
    <aside className="row-span-full">
      <Disclosure>
        <DisclosureButton className="group cursor-pointer flex items-center border-2 border-border-global p-2 heading-6 text-res-base w-full">
          <MdArrowRight
            size="32"
            className="group-data-[open]:rotate-90 transition-all duration-150"
          />
          Filter By Genre
        </DisclosureButton>
        <DisclosurePanel className="grid gap-4 border-2 border-t-0 border-border-global p-4">
          <FilterList genreNames={genreNames} selected={active} />
        </DisclosurePanel>
      </Disclosure>
      {/* <details className="border-2 border-border-global self-start">
        <summary className="p-4 border-b-2 border-b-border-global heading-4">
          Filter By Genre
        </summary>
      </details> */}
    </aside>
  );
}

function FilterList({ genreNames, selected }) {
  function handleClear() {
    redirect("/lineup/artists");
  }
  return (
    <Form action="/lineup/artists" className="grid gap-4">
      <ul className="grid gap-1">
        {genreNames.map((genreName, i) => (
          <li key={i}>
            <GenreCheckbox
              label={genreName}
              active={selected?.find((genre) => genre === genreName)}
            />
          </li>
        ))}
      </ul>
      <footer className="flex justify-between gap-2">
        <Button
          type="submit"
          formAction={handleClear}
          className="grow cursor-pointer body-copy bg-aztec-400 hover:bg-aztec-500 p-2 rounded-sm font-semibold max-w-40"
        >
          Clear all
        </Button>
        <Button
          type="submit"
          className="grow cursor-pointer body-copy bg-forest-500 hover:bg-forest-600 p-2 rounded-sm font-semibold max-w-40"
        >
          Apply
        </Button>
      </footer>
    </Form>
  );
}

function GenreCheckbox({ label, active }) {
  console.log(active);
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
