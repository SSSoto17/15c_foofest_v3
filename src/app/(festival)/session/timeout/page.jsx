import Image from "next/image";
import Link from "next/link";
import timelimit from "@/assets/img/timelimit.png";

export default function Page() {
  return (
    <main>
      <section className="grid grid-cols-4 h-full sm:grid-cols-10 sm:h-full sm:grid-rows-1">
        <Image
          className="col-start-2 col-span-full row-start-1 sm:col-start-6 sm:row-span-full sm:object-cover sm:h-full"
          src={timelimit}
          alt="Image of a forest. Photo by Sebastian Unrau on Unsplash"
          placeholder="blur"
        ></Image>
        <section className="row-start-1 row-span-4 col-start-1 col-span-3 grid grid-rows-subgrid sm:block sm:row-start-1 sm:col-start-1 sm:col-span-7 pt-20">
          <article className="grid gap-y-8">
            <h1 className="heading-1 uppercase self-end">
              Time limit exceeded...
            </h1>
            <div className="flow-space">
              <p className="body-copy row-start-2">
                The time limit makes it fair to all our customers searching for
                tickets.{" "}
              </p>
              <p className="body-copy">You’re welcome to try again!</p>
            </div>
            <Link
              href="/session/reservation/flow/checkout"
              className="uppercase px-6 py-3 w-fit border-forest-600 bg-forest-600 font-semibold hover:bg-forest-500 hover:border-forest-500 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400"
            >
              Try again
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
}
