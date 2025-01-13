import { getArtists } from "@/lib/lineup";
import LineupLayout from "@/components/lineup/LineupLayout";
import ByArtist from "@/components/lineup/ByArtist";
import ScrollToButton from "@/components/lineup/ScrollToButton";

export default async function Artists({ searchParams }) {
  const { limit } = await searchParams;
  const { genre } = await searchParams;

  // console.log("limit", Number(limit));
  const artists = await getArtists();

  return (
    <LineupLayout category="artists">
      <ByArtist artists={artists} filters={genre} limit={limit}></ByArtist>
      <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton>
    </LineupLayout>
  );
}
