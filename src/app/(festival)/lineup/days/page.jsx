import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/Table";
import { stageSchedule, Week } from "@/lib/schedule";

export default async function Days() {
  const schedule = await stageSchedule();
  const days = Week(schedule);

  return (
    <section className="grid gap-4">
      {days.map((day, i) => {
        return (
          <Accordion key={i} variant="primary" label={day.name} name="days">
            <section className="grid grid-cols-[auto_1fr_1fr_1fr] grid-rows-[2fr_12fr]">
              {day.cols.map((stage, i) => {
                return <ColSchedule {...stage} key={i} />;
              })}
            </section>
          </Accordion>
        );
      })}
    </section>
  );
}
