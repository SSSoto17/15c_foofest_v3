import Image from "next/image";
import Link from "next/link";
import succes from "@/assets/img/succes.png";
import Button from "@/components/Button";

export default function Page() {
  return (
    <main>
      <section className="grid grid-cols-4 h-full sm:grid-cols-10 sm:h-full sm:grid-rows-1">
        <Image
          className="col-start-2 col-span-full row-start-1 sm:col-start-6 sm:row-span-full sm:object-cover sm:h-full"
          src={succes}
          alt="Image from Foo Fest. Photo by Roberto Rendon on Unsplash"
          placeholder="blur"
        ></Image>
        <section className="row-start-1 row-span-4 col-start-1 col-span-3 grid grid-rows-subgrid sm:block sm:row-start-1 sm:col-start-1 sm:col-span-7 pt-20">
          <article className="grid gap-y-8">
            <h1 className="heading-1 uppercase self-end">
              Yes! You’re ready for FooFest
            </h1>
            <div className="flow-space">
              <p className="body-copy">
                You have succesfully purchased tickets for FooFest 2025. <br />{" "}
                We’ll send you an e-mail with the tickets shortly.{" "}
              </p>
              <p className="body-copy">Meanwhile check out the schedule!</p>
            </div>
            <Link
              href="/lineup/artists"
              className="uppercase px-6 py-3 w-fit border-forest-600 bg-forest-600 font-semibold hover:bg-forest-500 hover:border-forest-500 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400"
            >
              Lineup 2025
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
}
