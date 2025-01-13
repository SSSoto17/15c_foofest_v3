import TitleSchedule from "./TitleSchedule";

const HeaderSchedule = ({ text1, dec1, text2, dec2, text3, dec3 }) => {
  return (
    <header className="col-start-3 col-span-full row-start-1 grid grid-cols-subgrid">
      <TitleSchedule text={text1} decoration={dec1}></TitleSchedule>
      <TitleSchedule text={text2} decoration={dec2}></TitleSchedule>
      <TitleSchedule text={text3} decoration={dec3}></TitleSchedule>
    </header>
  );
};

export default HeaderSchedule;
