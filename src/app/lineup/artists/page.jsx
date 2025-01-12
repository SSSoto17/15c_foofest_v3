// COMPONENTS
import LineupLayout from "@/components/lineup/LineupLayout";
import ByArtist from "@/components/lineup/ByArtist";
import ScrollToButton from "@/components/lineup/ScrollToButton";

// FUNCTIONS
import { getArtists } from "@/lib/lineup";

export default async function Artists({ searchParams }) {
  const { genre, limit } = await searchParams;
  const artists = await getArtists();

  return (
    <LineupLayout category="artists">
      <ByArtist artists={artists} filters={genre} limit={limit} />
      {/* <ScrollToButton scrollFromTop="0" simple={false}>
        Back to top
      </ScrollToButton> */}
    </LineupLayout>
  );
}
