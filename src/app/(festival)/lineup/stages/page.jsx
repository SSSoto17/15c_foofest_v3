import { getStages } from "@/lib/lineup";
import LineupLayout from "@/components/lineup/LineupLayout";
import Accordion from "@/components/Accordion";
import StageSchedule from "@/components/lineup/schedule/StageSchedule";

export default async function Stages() {
  const stages = await getStages();
  const stageNames = Object.keys(stages);
  const stageSchedule = Object.entries(stages).map(([name, days]) => ({
    name,
    days,
  }));

  return (
    <LineupLayout category="stages">
      <section className="grid gap-4">
        {stageNames.map((stage, i) => {
          return (
            <Accordion key={i} variant="primary" label={stage} name="stage">
              <StageSchedule data={stageSchedule[i].days}></StageSchedule>
            </Accordion>
          );
        })}
      </section>{" "}
    </LineupLayout>
  );
}
