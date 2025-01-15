// COMPONENTS
import Link from "next/link";
import Filter from "@/components/lineup/Filter";
import ArtistCard from "@/components/lineup/ArtistCard";
import { ScrollToButton } from "@/components/lineup/Buttons";
// FUNCTIONS
import { getArtists } from "@/lib/lineup";

async function getArtistData(genre, limit) {
  const data = await getArtists();
  const artistsData = {
    totalArtists: data.length,
    artists: data.sort((a, b) => a.name.localeCompare(b.name)),
  };

  if (Array.isArray(genre)) {
    artistsData.artists = genre.flatMap((obj) =>
      artistsData.artists.filter((artist) => artist.genre === obj)
    );
  } else if (genre) {
    artistsData.artists = artistsData.artists.filter(
      (artist) => artist.genre === genre
    );
  }

  // if (limit) {
  //   artistsData.artists.slice(0, limit);
  // } else {
  //   artistsData.artists.slice(0, 12);
  // }

  return artistsData;
}

async function genreData() {
  const artists = await getArtists();
  const genres = new Set(artists.map((artist) => artist.genre).sort());

  return [...genres];
}

export default async function Page({ searchParams }) {
  const { genre, limit } = await searchParams;
  const genres = await genreData();
  const artistData = await getArtistData(genre, limit || 12);

  return (
    <section className="grid sm:grid-cols-4 gap-4 items-start">
      <Filter genres={genres} active={genre} />
      <ul className="sm:col-span-3 grid grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-4 content-start">
        {Array.isArray(genre) ? (
          genre.map((filter, id) => {
            console.log(filter);
            return (
              <FilterGroup key={id} filter={filter}>
                {artistData.artists
                  .filter((artist) => artist.genre === filter)
                  .map((artist, id) => {
                    return <ArtistCard key={id} {...artist} />;
                  })}
              </FilterGroup>
            );
          })
        ) : genre ? (
          <FilterGroup filter={genre}>
            {artistData.artists
              .filter((artist) => artist.genre === genre)
              .map((artist, id) => {
                return <ArtistCard key={id} {...artist} />;
              })}
          </FilterGroup>
        ) : (
          artistData.artists.map((artist, id) => (
            <ArtistCard key={id} {...artist} />
          ))
        )}
      </ul>
      {/* <footer className="sm:col-start-2 sm:col-span-3 grid place-content-center">
        {(!limit || limit < artists.length) && (
          <Link
            href={`/lineup/artists?limit=${Number(limit) + 12 || 24}`}
            scroll={false}
            replace={true}
            className="col-start-2 col-span-3 cursor-pointer border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 inline-block px-6 py-3 mt-8 place-self-center"
          >
            Load more
          </Link>
        )}
      </footer> */}
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </section>
  );
}

function FilterGroup({ filter, children }) {
  return (
    <li className="col-span-full grid grid-cols-subgrid">
      <h2 className="col-span-full heading-6">{filter}</h2>
      <ul className="col-span-full grid grid-cols-subgrid gap-y-4 py-6">
        {children}
      </ul>
    </li>
  );
}
