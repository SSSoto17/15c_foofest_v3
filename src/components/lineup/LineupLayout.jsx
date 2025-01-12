import LineupNav from "@/components/lineup/LineupNav";

export default function LineupLayout({ category, children }) {
  return (
    <main className="grid gap-4 content-start">
      <section className="flow-space">
        <h1 className="heading-title text-center">Lineup</h1>
        <LineupNav active={category} />
      </section>
      {children}
    </main>
  );
}
