import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/Table";
import { stageSchedule, Days } from "@/lib/schedule";

export default async function Stages() {
  const stages = await stageSchedule();

  return (
    <section className="grid gap-4 items-start">
      {stages.map((stage, i) => {
        const cols = Days(stage);
        return (
          <Accordion key={i} variant="primary" label={stage.name} name="stage">
            <section className="grid grid-cols-[auto_1fr_1fr_1fr] grid-rows-[2fr_12fr]">
              {cols.map((day, i) => {
                return <ColSchedule {...day} key={i} />;
              })}
            </section>
          </Accordion>
        );
      })}
    </section>
  );
}
