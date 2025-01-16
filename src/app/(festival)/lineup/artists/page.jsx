// COMPONENTS
import Filter from "@/components/lineup/Filter";
import ArtistCard from "@/components/lineup/ArtistCard";
import { ScrollToButton } from "@/components/lineup/Buttons";
// FUNCTIONS
import { getArtists } from "@/lib/lineup";
import { LoadMore } from "@/components/lineup/Filter";

async function genreData() {
  const artists = await getArtists();
  const genres = new Set(artists.map((artist) => artist.genre).sort());

  return [...genres];
}

export default async function Page({ searchParams }) {
  const { genre, limit } = await searchParams;
  const genres = await genreData();
  let artists = await getArtists();

  // SORT ARTISTS
  artists.sort((a, b) => a.name.localeCompare(b.name));

  // FILTER ARTISTS
  if (genre instanceof Array) {
    artists = genre.flatMap((obj) =>
      artists.filter((artist) => artist.genre === obj)
    );
  } else if (genre) {
    artists = artists.filter((artist) => artist.genre === genre);
  }

  // LIMIT ARTISTS
  if (!genre && limit) {
    const loadLimit = Number(limit) + 12;
    artists = artists.slice(0, loadLimit);
  } else if (!genre && !limit) {
    artists = artists.slice(0, 12);
  }

  return (
    <section className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 items-start relative">
      <Filter genres={genres} active={genre} />
      <ArtistGrid data={artists} genre={genre} limit={limit} />
      <ScrollToButton scrollFromTop="0">Back to top</ScrollToButton>
    </section>
  );
}

function ArtistGrid({ data, limit, genre }) {
  return (
    <ul className="sm:col-span-2 lg:col-span-3 grid grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-4 content-start">
      {genre instanceof Array ? (
        genre.map((filter, id) => {
          return (
            <FilterGroup
              key={id}
              filter={filter}
              data={data.filter((artist) => artist.genre === filter)}
            />
          );
        })
      ) : genre ? (
        <FilterGroup
          filter={genre}
          data={data.filter((artist) => artist.genre === genre)}
        />
      ) : (
        data.map((artist, id) => {
          return <ArtistCard key={id} {...artist} />;
        })
      )}
      {((!limit && !genre) || (!genre && data.length > limit)) && (
        <LoadMore limit={limit} genre={genre} />
      )}
    </ul>
  );
}

function FilterGroup({ filter, data }) {
  return (
    <li className="col-span-full grid grid-cols-subgrid">
      <h2 className="col-span-full heading-6">{filter}</h2>
      <ul className="col-span-full grid grid-cols-subgrid gap-y-4 py-6 ">
        {data.map((artist, id) => {
          return <ArtistCard key={id} {...artist} />;
        })}
      </ul>
    </li>
  );
}
