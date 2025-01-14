"use client";

// COMPONENTS
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Layout({ children }) {
  return (
    <main className="grid gap-10 content-start">
      <section className="grid gap-6">
        <h1 className="heading-title text-center">Lineup</h1>
        <TabNavigation />
      </section>
      {children}
    </main>
  );
}

function TabNavigation() {
  const currentPage = useSelectedLayoutSegment();
  const tabs = ["artists", "days", "stages"];

  return (
    <ul className="flex gap-8 uppercase font-semibold justify-center mb-8">
      {tabs.map((tab, id) => {
        const isActive = tab === currentPage;
        return (
          <li
            key={id}
            className={isActive ? "border-b-2 border-forest-700" : undefined}
          >
            <Link href={`/lineup/${tab}`}>{tab}</Link>
          </li>
        );
      })}
    </ul>
  );
}
