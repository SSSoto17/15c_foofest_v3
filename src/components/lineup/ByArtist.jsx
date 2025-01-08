"use client";
import ArtistCard from "@/components/lineup/ArtistCard";
import ScrollToButton from "./ScrollToButton";

const ByArtist = ({ artists }) => {
  const endpoint = process.env.FOO_FEST_API_URL;
  const artistsSortedByName = artists.sort((a, b) => {
    // Useing method from the following link
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
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
  console.log("ARTIST:", artistsSortedByName);

  return (
    <section>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {artistsSortedByName.map((artist, i) => (
          // console.log("ARTIST:", artist.slug)
          <ArtistCard key={i} name={artist.name} slug={artist.slug} img={artist.logo.startsWith("https://") ? artist.logo : `${endpoint}/logos/${artist.logo}`}></ArtistCard>
        ))}
      </ul>
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </section>
  );
};

export default ByArtist;
