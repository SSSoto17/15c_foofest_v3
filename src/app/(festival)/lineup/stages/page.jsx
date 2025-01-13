import { getStages } from "@/lib/lineup";
import Accordion from "@/components/Accordion";
import ColSchedule from "@/components/lineup/schedule/ColSchedule";
import HeaderSchedule from "@/components/lineup/schedule/HeaderSchedule";
import TableCell from "@/components/lineup/schedule/TableCell";

export default async function Stages() {
  const stages = await getStages();
  const stageNames = Object.keys(stages);
  const stageSchedule = Object.entries(stages).map(([name, days]) => ({
    name,
    days,
  }));

  return (
    <section className="grid gap-4 items-start">
      {stageSchedule.map((stage, i) => {
        const days = stage.days.mon;
        console.log("HEJ:", days);
        return (
          <Accordion key={i} variant="primary" label={stage.name} name="stage">
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
          </Accordion>
        );
      })}
      <Accordion variant="primary" label="stage" name="stage">
        <section className="grid grid-cols-4 grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
          <HeaderSchedule text1="Thursday" dec1="08" text2="Friday" dec2="09" text3="Saturday" dec3="10"></HeaderSchedule>
          {/* <ul className="row-start-2 row-span-full col-span-2 grid grid-cols-1 grid-rows-subgrid">
            {thu.map((time, i) => (
              <TableCell key={i}>
                <p className="text-res-sm sm:text-res-base">{time.start}</p>
              </TableCell>
            ))}
          </ul> */}
          <ul className="col-span-6 row-span-full grid grid-cols-subgrid grid-rows-subgrid">
            {/* <ColSchedule acts={thu}></ColSchedule>
            <ColSchedule acts={fri}></ColSchedule>
            <ColSchedule acts={sat}></ColSchedule> */}
          </ul>
        </section>
      </Accordion>
    </section>

    //  <section className="grid gap-4">
    //   {stageNames.map((stage, i) => {

    //     return (
    //       <Accordion key={i} variant="primary" label={stage} name="stage">
    //         <section className="grid grid-cols-8 grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
    //           <HeaderSchedule text1="Thursday" dec1="08" text2="Friday" dec2="09" text3="Saturday" dec3="10"></HeaderSchedule>
    //           <ul className="row-start-2 row-span-full col-span-2 grid grid-cols-1 grid-rows-subgrid">
    //             {thu.map((time, i) => (
    //               <TableCell key={i}>
    //                 <p className="text-res-sm sm:text-res-base">{time.start}</p>
    //               </TableCell>
    //             ))}
    //           </ul>
    //           <ul className="col-span-6 row-span-full grid grid-cols-subgrid grid-rows-subgrid">
    //             <ColSchedule acts={thu}></ColSchedule>
    //             <ColSchedule acts={fri}></ColSchedule>
    //             <ColSchedule acts={sat}></ColSchedule>
    //           </ul>
    //         </section>
    //       </Accordion>
    //     );
    //   })}
    // </section>
  );
}

function TabelCol({ children }) {
  return (
    <article>
      <header>TitleSchedule</header>
      <ul className="row-start-2 row-span-full col-span-2 grid grid-cols-1 grid-rows-subgrid">{children}</ul>
    </article>
  );
}

const StageSchedule = ({ data }) => {
  console.log("Schedule DATA", data);

  const thu = data.thu;
  const fri = data.fri;
  const sat = data.sat;

  // return (
  //   <section className="grid grid-cols-[0.5fr_1fr_1fr_1fr] grid-rows-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
  //     <HeaderSchedule text1="Thursday" dec1="08" text2="Friday" dec2="09" text3="Saturday" dec3="10"></HeaderSchedule>
  //     <ul className="row-start-2 row-span-full grid grid-cols-1 grid-rows-subgrid">
  //       {thu.map((time, i) => (
  //         <TableCell key={i}>
  //           <p className="text-res-sm sm:text-res-base">{time.start}</p>
  //         </TableCell>
  //       ))}
  //     </ul>
  //     <ul className="col-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
  //       <ColSchedule acts={thu}></ColSchedule>
  //       <ColSchedule acts={fri}></ColSchedule>
  //       <ColSchedule acts={sat}></ColSchedule>
  //     </ul>
  //   </section>
  // );
};
