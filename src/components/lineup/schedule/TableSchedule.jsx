export default function TableSchedule() {
  return (
    <section className="grid grid-cols-[auto_1fr_1fr_1fr] grid-rows-[2fr_12fr]">
      <ColSchedule data={stage.days.thu} time>
        {/* {stage.days.thu.map((time, i) => (
                  <li key={i}>
                    <p className="text-res-sm sm:text-res-base">{time.start}</p>
                  </li>
                ))} */}
      </ColSchedule>
      <ColSchedule data={stage.days.thu} decoration="08">
        Thursday
      </ColSchedule>
      <ColSchedule data={stage.days.fri} decoration="09">
        Friday
      </ColSchedule>
      <ColSchedule data={stage.days.sat} decoration="10">
        Thursday
      </ColSchedule>
    </section>
  );
}
