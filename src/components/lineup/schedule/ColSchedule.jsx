import { getArtists } from "@/lib/lineup";
import TableCell from "./TableCell";
import Link from "next/link";

const ColSchedule = async ({ acts }) => {
  const artists = await getArtists();
  // console.log(artists);
  return (
    <li className=" row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid ">
      <ul className="row-span-full grid grid-rows-subgrid">
        {acts.map((act, id) => {
          const artistMatch = artists.find(({ name }) => name === act.act);
          return act.act === "break" ? (
            <TableCell key={id}></TableCell>
          ) : act.cancelled ? (
            <TableCell key={id}>
              <Link href={`/lineup/artists/single/${artistMatch.slug}`}>
                <p className="col-start-1 text-res-sm sm:text-res-base">
                  {act.act}
                </p>
              </Link>
              <p className="col-start-1 opacity-75 -rotate-12 text-res-xs sm:text-res-sm uppercase border-2 border-gold-600 text-gold-600 inline-block px-1 sm:px-2 sm:py-0.5">
                Cancelled
              </p>
            </TableCell>
          ) : (
            <TableCell key={id}>
              <Link href={`/lineup/artists/single/${artistMatch.slug}`}>
                <p className="text-res-sm sm:text-res-base"> {act.act}</p>
              </Link>
            </TableCell>
          );
        })}
      </ul>
    </li>
  );
};

export default ColSchedule;
