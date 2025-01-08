import { getArtists } from "@/lib/lineup";
import TableCell from "./TableCell";

const ColSchedule = async ({ data }) => {
  const artists = await getArtists();
  console.log(artists);
  return (
    <li className=" row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid ">
      <ul className="row-span-full grid grid-rows-subgrid">
        {data.map((act) => {
          //const artistMatched = brug filter-metoden til at matche artist name til act
          // Derefter brug artistMatched.slug til linket. href="/lineup/artists..."
          return act.act === "break" ? (
            <TableCell></TableCell>
          ) : act.cancelled ? (
            <TableCell>
              <p className="col-start-1 text-res-sm sm:text-res-base">
                {act.act}
              </p>
              <p className="col-start-1 opacity-75 -rotate-12 text-res-xs sm:text-res-sm uppercase border-2 border-gold-600 text-gold-600 inline-block px-1 sm:px-2 sm:py-0.5">
                Cancelled
              </p>
            </TableCell>
          ) : (
            <TableCell>
              <p className="text-res-sm sm:text-res-base"> {act.act}</p>
            </TableCell>
          );
        })}
      </ul>
    </li>
  );
};

export default ColSchedule;
