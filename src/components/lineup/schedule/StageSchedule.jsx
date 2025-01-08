import ColSchedule from "./ColSchedule";
import HeaderSchedule from "./HeaderSchedule";
import TableCell from "./TableCell";

const StageSchedule = ({ data }) => {
  // console.log("Schedule DATA", data);

  const dataArr = Object.values(data); //Laver objektet om til et array
  const thu = data.thu;
  const fri = data.fri;
  const sat = data.sat;

  return (
    <section className="grid grid-cols-[0.5fr_1fr_1fr_1fr] grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
      <HeaderSchedule
        text1="Thursday"
        dec1="08"
        text2="Friday"
        dec2="09"
        text3="Saturday"
        dec3="10"
      ></HeaderSchedule>
      <ul className="row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid">
        {thu.map((time, i) => (
          <TableCell key={i}>
            <p className="text-res-sm sm:text-res-base">{time.start}</p>
          </TableCell>
        ))}
      </ul>
      <ul className="col-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
        <ColSchedule data={thu}></ColSchedule>
        <ColSchedule data={fri}></ColSchedule>
        <ColSchedule data={sat}></ColSchedule>
      </ul>
    </section>
  );
};

export default StageSchedule;
