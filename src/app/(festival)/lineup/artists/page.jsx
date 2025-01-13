import { getArtists } from "@/lib/lineup";
import { endpointAPI } from "@/lib/endpoints";
import Link from "next/link";
import ScrollToButton from "@/components/lineup/ScrollToButton";
import ArtistCard from "@/components/lineup/ArtistCard";

export default async function Artists({ searchParams }) {
  const { limit, genre } = await searchParams;
  const artists = await getArtists();

  return (
    <section className="grid grid-cols-4 gap-4">
      <ul className="grid grid-cols-subgrid col-span-full gap-y-4 ">
        {artists.map((artist, i) => (
          <ArtistCard key={i} {...artist} />
        ))}
      </ul>
      <footer className="col-span-full">
        {/* {limit < artists.length && (
        <Link
          href={`/lineup/artists?limit=${newLoad}`}
          scroll={false}
          className="border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 inline-block px-6 py-3 mt-8 place-self-center"
        >
          Load more
        </Link>
      )} */}
      </footer>

      {/* <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton> */}
    </section>
  );
}

const ByArtist = ({ artists, limit }) => {
  //Sorting artists
  // Useing method from the following link
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const artistsSortedByName = artists.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // For "load more" button
  const initalLoad = 12;
  const currentLoad = limit ? limit : (limit = initalLoad);
  const newLoad = Number(currentLoad) + initalLoad;

  const artistsShowed = artistsSortedByName.slice(0, limit);
};
