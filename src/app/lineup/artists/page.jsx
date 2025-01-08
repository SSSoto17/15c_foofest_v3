import { getArtists } from "@/lib/lineup";
import LineupLayout from "@/components/lineup/LineupLayout";
import ByArtist from "@/components/lineup/ByArtist";

export default async function Artists({ searchParams }) {
  const { genre } = await searchParams;

  // console.log(genre);
  const artists = await getArtists();

  return (
    <LineupLayout category="artists">
      <ByArtist artists={artists} filters={genre}></ByArtist>
    </LineupLayout>
  );
}
