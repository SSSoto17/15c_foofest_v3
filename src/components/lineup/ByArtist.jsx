import ArtistCard from "@/components/lineup/ArtistCard";
import Link from "next/link";

import { endpointAPI } from "@/lib/endpoints";

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

  return (
    <section className="grid mb-16">
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {artistsShowed.map((artist, i) => (
          <ArtistCard
            key={i}
            name={artist.name}
            slug={artist.slug}
            img={
              artist.logo.startsWith("https://")
                ? artist.logo
                : `${endpointAPI}/logos/${artist.logo}`
            }
          ></ArtistCard>
        ))}
      </ul>

      {limit < artists.length && (
        <Link
          href={`/lineup/artists?limit=${newLoad}`}
          scroll={false}
          className="border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 inline-block px-6 py-3 mt-8 place-self-center"
        >
          Load more
        </Link>
      )}
    </section>
  );
};

export default ByArtist;
