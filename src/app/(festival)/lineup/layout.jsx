// import LineupNav from "@/components/lineup/LineupNav";
import TabGroup from "@/components/lineup/LineupNav";

export default async function Layout({ children }) {
  return (
    <main className="grid gap-4 content-start">
      <header className="flow-space">
        <h1 className="heading-title text-center">Lineup</h1>
        <TabGroup />
      </header>
      {children}
    </main>
  );
}
