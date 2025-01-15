// COMPONENTS
import Link from "next/link";
import Filter from "@/components/lineup/SortByMenu";
import ArtistCard from "@/components/lineup/ArtistCard";
import { ScrollToButton } from "@/components/lineup/Buttons";
// FUNCTIONS
import { getArtists } from "@/lib/lineup";

async function artistData(genre, limit) {
  let artists = await getArtists();

  if (Array.isArray(genre)) {
    artists = genre.flatMap((obj) =>
      artists.filter((artist) => artist.genre === obj)
    );

    return artists.sort((a, b) => a.name.localeCompare(b.name));
  } else if (genre) {
    artists = artists.filter((artist) => artist.genre === genre);
  }

  return artists.sort((a, b) => a.name.localeCompare(b.name)).slice(0, limit);
}

async function genreData() {
  const artists = await getArtists();
  const genres = new Set(artists.map((artist) => artist.genre).sort());

  return [...genres];
}

export default async function Page({ searchParams }) {
  const { genre, limit } = await searchParams;
  const genres = await genreData();
  let artists = await artistData(genre, limit || 12);

  return (
    <section className="grid grid-cols-4 gap-4 items-start">
      <Filter genres={genres} active={genre} />
      <ul className="col-span-3 grid grid-cols-subgrid gap-4">
        {Array.isArray(genre) ? (
          genre.map((filter, id) => {
            console.log(filter);
            return (
              <FilterGroup key={id} filter={filter}>
                {artists
                  .filter((artist) => artist.genre === filter)
                  .map((artist, id) => {
                    return <ArtistCard key={id} {...artist} />;
                  })}
              </FilterGroup>
            );
          })
        ) : genre ? (
          <FilterGroup filter={genre}>
            {artists
              .filter((artist) => artist.genre === genre)
              .map((artist, id) => {
                return <ArtistCard key={id} {...artist} />;
              })}
          </FilterGroup>
        ) : (
          artists.map((artist, id) => <ArtistCard key={id} {...artist} />)
        )}
      </ul>
      {/* <Link
        href={`/lineup/artists?limit=${Number(limit) + 12 || 24}`}
        scroll={false}
        className="col-start-2 col-span-3 cursor-pointer border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 inline-block px-6 py-3 mt-8 place-self-center"
      >
        Load more
      </Link> */}
      {/* <Link
        href={`/lineup/artists?limit=${Number(limit) + 12 || 24}${
          genre ? `&genre=${genre.join("&genre=")}` : ""
        }`}
        scroll={false}
        className="col-start-2 col-span-3 cursor-pointer border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 inline-block px-6 py-3 mt-8 place-self-center"
      >
        Load more
      </Link> */}
      {/* {limit < artists.length && (
      )} */}
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </section>
  );
}

function FilterGroup({ filter, children }) {
  return (
    <li className="col-span-3 grid grid-cols-subgrid">
      <h2 className="col-span-full heading-4">{filter}</h2>
      <ul className="col-span-full grid grid-cols-subgrid gap-y-4 py-6">
        {children}
      </ul>
    </li>
  );
}
