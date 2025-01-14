import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/Table";
import { stageSchedule, Days } from "@/lib/schedule";

export default async function Stages({ searchParams }) {
  const { stage } = await searchParams;
  const stages = await stageSchedule();

  return (
    <section className="grid gap-4 items-start">
      {stages.map((obj, i) => {
        const cols = Days(obj);
        return (
          <Accordion
            key={i}
            variant="primary"
            label={obj.name}
            name="stage"
            isOpen={stage === obj.name}
          >
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
