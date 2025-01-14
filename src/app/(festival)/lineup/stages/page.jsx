import { getStages } from "@/lib/lineup";
import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/schedule/ColSchedule";

export default async function Stages() {
  const stages = await getStages();
  const stageSchedule = Object.entries(stages).map(([name, days]) => ({
    name,
    days,
  }));

  function Day(day, data, date, time) {
    this.title = day;
    this.data = data;
    this.deco = date;
    this.time = time;
  }

  function Days(stage) {
    const hours = new Day("", stage.days.thu, "", true);
    const thu = new Day("Thursday", stage.days.thu, "08", false);
    const fri = new Day("Friday", stage.days.fri, "09", false);
    const sat = new Day("Saturday", stage.days.sat, "10", false);
    const cols = [hours, thu, fri, sat];
    return cols;
  }

  return (
    <section className="grid gap-4 items-start">
      {stageSchedule.map((stage, i) => {
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
