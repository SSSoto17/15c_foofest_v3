import { MdOutlineCheck } from "react-icons/md";
import { useState } from "react";

import { Button, Checkbox, Field, Label } from "@headlessui/react";
import Link from "next/link";

const SortByMenu = ({ genreNames }) => {
  return (
    <details className="border-2 border-border-global self-start">
      <summary className="p-4 border-b-2 border-b-border-global heading-4">Filter By Genre</summary>
      <form action="/lineup/artists" className="grid grid-cols-1">
        <ul className="p-4">
          {genreNames.map((genreName, i) => (
            <li key={i} className="pt-2">
              <GenreCheckbox label={genreName} />
            </li>
          ))}
        </ul>
        <div className="place-self-center flex gap-2">
          <Link href="/lineup/artists" className="cursor-pointer place-self-center border-forest-600 border-2 px-2 py-0.5 rounded-sm mb-4">
            Clear all
          </Link>

          <Button type="submit" className="cursor-pointer place-self-center border-forest-600 border-2  bg-forest-600 px-2 py-0.5 rounded-sm mb-4">
            Apply
          </Button>
        </div>
      </form>
    </details>
  );
};

export default SortByMenu;

export function GenreCheckbox({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <Field className="flex items-center gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox name="genre" value={label} checked={checked} onChange={setChecked} className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none">
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label className="">{label}</Label>
    </Field>
  );
}
