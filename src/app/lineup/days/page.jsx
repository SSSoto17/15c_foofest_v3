import { getStages } from "@/lib/lineup";

import LineupLayout from "@/components/lineup/LineupLayout";
import ByDay from "@/components/lineup/ByDay";

export default async function Days() {
  const stages = await getStages();

  return (
    <LineupLayout category="days">
      <ByDay data={stages}></ByDay>
    </LineupLayout>
  );
}
