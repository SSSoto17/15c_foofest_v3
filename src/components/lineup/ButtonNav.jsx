import Link from "next/link";

const ButtonNav = ({ active, label, setActive }) => {
  return (
    <li className={active ? "border-b-2 border-forest-700" : undefined}>
      <Link href={`/lineup/${label}`}>{label}</Link>
      {/* <button onClick=`/${label}`>{label}</button> */}
    </li>
  );
};

export default ButtonNav;
