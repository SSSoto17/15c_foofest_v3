import Accordion from "@/components/Accordion";
import DaySchedule from "@/components/lineup/schedule/DaySchedule";

const ByDay = ({ data }) => {
  const stages = data;

  const Midgard = stages.Midgard;
  const MidMon = Midgard.mon;
  const MidTues = Midgard.tue;
  const MidWed = Midgard.wed;
  const MidThur = Midgard.thu;
  const MidFri = Midgard.fri;
  const MidSat = Midgard.sat;
  const MidSun = Midgard.sun;

  const Vanaheim = stages.Vanaheim;
  const VanaMon = Vanaheim.mon;
  const VanaTues = Vanaheim.tue;
  const VanaWed = Vanaheim.wed;
  const VanaThur = Vanaheim.thu;
  const VanaFri = Vanaheim.fri;
  const VanaSat = Vanaheim.sat;
  const VanaSun = Vanaheim.sun;

  const Jotunheim = stages.Jotunheim;
  const JotunMon = Jotunheim.mon;
  const JotunTues = Jotunheim.tue;
  const JotunWed = Jotunheim.wed;
  const JotunThur = Jotunheim.thu;
  const JotunFri = Jotunheim.fri;
  const JotunSat = Jotunheim.sat;
  const JotunSun = Jotunheim.sun;

  return (
    <section className="grid gap-4">
      <Accordion label="Monday" name="day" variant="primary">
        <DaySchedule jotun={JotunMon} mid={MidMon} vana={VanaMon}></DaySchedule>
      </Accordion>
      <Accordion label="Tuesday" name="day" variant="primary">
        <DaySchedule
          jotun={JotunTues}
          mid={MidTues}
          vana={VanaTues}
        ></DaySchedule>
      </Accordion>
      <Accordion label="Wednesday" name="day" variant="primary">
        <DaySchedule jotun={JotunWed} mid={MidWed} vana={VanaWed}></DaySchedule>
      </Accordion>
      <Accordion label="Thursday" name="day" variant="primary">
        <DaySchedule
          jotun={JotunThur}
          mid={MidThur}
          vana={VanaThur}
        ></DaySchedule>
      </Accordion>
      <Accordion label="Friday" name="day" variant="primary">
        <DaySchedule jotun={JotunFri} mid={MidFri} vana={VanaFri}></DaySchedule>
      </Accordion>
      <Accordion label="Saturday" name="day" variant="primary">
        <DaySchedule jotun={JotunSat} mid={MidSat} vana={VanaSat}></DaySchedule>
      </Accordion>
      <Accordion label="Sunday" name="day" variant="primary">
        <DaySchedule jotun={JotunSun} mid={MidSun} vana={VanaSun}></DaySchedule>
      </Accordion>
    </section>
  );
};

export default ByDay;
