"use client";
import ArtistCard from "@/components/lineup/ArtistCard";
import Link from "next/link";
import SortByMenu from "./SortByMenu";

export default function ByArtist({ artists, filters, limit }) {
  const genres = Object.groupBy(artists, ({ genre }) => genre);
  const sortedGenreNames = Object.keys(genres).toSorted();
  const artistsSortedByName = sortArtists(artists);

  // For "load more" button
  const initalLoad = 12;
  const currentLoad = limit ? limit : (limit = initalLoad);
  const newLoad = Number(currentLoad) + initalLoad;

  const artistsShowed = artistsSortedByName.slice(0, limit);

  return (
    <section className="grid grid-cols-4 gap-4 items-start">
      <SortByMenu genreNames={sortedGenreNames} active={filters} />
      <ul className="col-span-3 grid grid-cols-subgrid gap-4">
        {filters
          ? filters.map((filter, id) => (
              <FilterGroup key={id} filter={filter}>
                {artists
                  .filter((artist) => artist.genre === filter)
                  .map((artist, id) => (
                    <ArtistCard key={id} {...artist} />
                  ))}
              </FilterGroup>
            ))
          : artists.map((artist, id) => <ArtistCard key={id} {...artist} />)}
      </ul>
      {/* {filters ? (
        filters.map((filter, i) => {
          return <div key={i}>{filter}</div>;
        })
      ) : (
        <ul className="grid grid-cols-subgrid col-span-3 gap-4">
          {artists.map((artist, i) => (
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
      )} */}
      {/* <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
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
              )} */}
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

function sortArtists(artists) {
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

  return artistsSortedByName;
}
