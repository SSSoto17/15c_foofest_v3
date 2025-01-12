"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

export default function TabGroup() {
  const currentPage = useSelectedLayoutSegment();
  const tabs = ["artists", "days", "stages"];

  return (
    <nav className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {tabs.map((tab, id) => {
        const isActive = tab === currentPage;
        return (
          <Link
            key={id}
            href={`/lineup/${tab}`}
            className={isActive ? "border-b-2 border-forest-700" : null}
          >
            {tab}
          </Link>
        );
      })}
    </nav>
  );
}
