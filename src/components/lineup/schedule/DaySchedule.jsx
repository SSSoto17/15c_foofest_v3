import ColSchedule from "./ColSchedule";
import HeaderSchedule from "./HeaderSchedule";
import TableCell from "./TableCell";

const DaySchedule = ({ jotun, mid, vana }) => {
  return (
    // grid-rows-[repeat(13,_minmax(0,_1fr)
    <section className="grid grid-cols-[0.5fr_1fr_1fr_1fr] grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
      <HeaderSchedule text1="Jotunheim" dec1="Jotun" text2="Midgard" dec2="Mid" text3="Vanaheim" dec3="Vana"></HeaderSchedule>
      <ul className="row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid">
        {jotun.map((time, i) => (
          <TableCell key={i}>
            <p className="text-res-sm sm:text-res-base">{time.start}</p>
          </TableCell>
        ))}
      </ul>
      <ul className="col-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
        <ColSchedule data={jotun}></ColSchedule>
        <ColSchedule data={mid}></ColSchedule>
        <ColSchedule data={vana}></ColSchedule>
      </ul>
    </section>
  );
};

export default DaySchedule;
