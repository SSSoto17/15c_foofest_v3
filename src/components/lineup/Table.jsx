import { getArtists } from "@/lib/lineup";
import Link from "next/link";

const ColSchedule = async ({ data, time, deco, title }) => {
  const artists = await getArtists();
  return (
    <article className="row-span-full grid grid-rows-subgrid gap-0">
      <header className="grid grid-cols-[1fr_1fr_1fr_4fr] grid-rows-4">
        {deco && (
          <p className="hidden font-display text-res-5xl md:block uppercase text-forest-900 row-start-1 row-span-4 col-start-1 col-span-3">
            {deco}
          </p>
        )}
        <h2 className="-rotate-45 -translate-9 sm:-translate-12 md:translate-0 md:rotate-0 heading-5 row-start-3 row-span-2 col-start-2 col-span-full">
          {title}
        </h2>
      </header>
      <ul className="grid grid-rows-12">
        {data.map((obj, id) => {
          const artistMatch = artists.find(({ name }) => name === obj.act);
          return (
            <TableCell key={id} cancelled={!time && obj.cancelled}>
              {time
                ? obj.start
                : !time &&
                  obj.act !== "break" && (
                    <Link
                      href={`/lineup/artists/single/${artistMatch.slug}`}
                      className="col-start-1 text-res-sm sm:text-res-base"
                    >
                      {obj.act}
                    </Link>
                  )}
            </TableCell>
          );
        })}
      </ul>
    </article>
  );
};

export default ColSchedule;

const TableCell = ({ cancelled, children }) => {
  return (
    <li className="pr-2 sm:p-2 border-t-2 border-border-global sm:min-w-32">
      {children}
      {cancelled && (
        <p className="col-start-1 opacity-75 -rotate-8 text-res-xs sm:text-res-sm uppercase border-2 border-gold-600 text-gold-600 max-w-min px-1 sm:px-2 sm:py-0.5">
          Cancelled
        </p>
      )}
    </li>
  );
};
