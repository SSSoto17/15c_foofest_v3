import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="heading-1 uppercase self-end">Yes! You’re ready for FooFest</h1>
      <div className="flow-space">
        <p className="body-copy">
          You have succesfully purchased tickets for FooFest 2025. <br /> We’ll send you an e-mail with the tickets shortly.{" "}
        </p>
        <p className="body-copy">Meanwhile check out the schedule!</p>
      </div>
      <Link href="/lineup/artists" className="uppercase px-6 py-3 w-fit border-forest-600 bg-forest-600 font-semibold hover:bg-forest-500 hover:border-forest-500 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400">
        Lineup 2025
      </Link>
    </>
  );
}
