import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/Table";
import { stageSchedule, Week } from "@/lib/schedule";

export default async function Days({ searchParams }) {
  const { day } = await searchParams;
  const schedule = await stageSchedule();
  const days = Week(schedule);

  return (
    <section className="grid gap-4">
      {days.map((obj, i) => {
        return (
          <Accordion
            key={i}
            variant="primary"
            label={obj.name}
            name="day"
            isOpen={day === obj.name}
          >
            <section className="grid grid-cols-[auto_1fr_1fr_1fr] grid-rows-[2fr_12fr]">
              {obj.cols.map((stage, i) => {
                return <ColSchedule {...stage} key={i} />;
              })}
            </section>
          </Accordion>
        );
      })}
    </section>
  );
}
