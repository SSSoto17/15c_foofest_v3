"use client";
import ButtonNav from "./ButtonNav";

const LineupNav = ({ active }) => {
  const pages = ["artists", "days", "stages"];
  return (
    <ul className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {pages.map((page, id) => {
        return <ButtonNav key={id} label={page} active={active == page} />;
      })}
    </ul>
  );
};

export default LineupNav;
