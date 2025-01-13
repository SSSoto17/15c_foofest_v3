import Image from "next/image";
import Link from "next/link";
import { getArtistBySlug, getArtists, getStages } from "@/lib/lineup";
import { endpointAPI } from "@/lib/endpoints";

import BackButton from "@/components/lineup/BackButton";

export async function generateStaticParams() {
  const artists = await getArtists();

  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

export default async function ArtistSingle({ params }) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  const img = artist.logo.startsWith("https://")
    ? artist.logo
    : `${endpointAPI}/logos/${artist.logo}`;

  // SCHEDULE RECONFIGURATION
  const schedule = await getStages();

  const mon = {
    day: "Monday",
    acts: [
      ...schedule.Midgard.mon,
      ...schedule.Jotunheim.mon,
      ...schedule.Vanaheim.mon,
    ],
  };
  const tue = {
    day: "Tuesday",
    acts: [
      ...schedule.Midgard.tue,
      ...schedule.Jotunheim.tue,
      ...schedule.Vanaheim.tue,
    ],
  };
  const wed = {
    day: "Wednesday",
    acts: [
      ...schedule.Midgard.wed,
      ...schedule.Jotunheim.wed,
      ...schedule.Vanaheim.wed,
    ],
  };
  const thu = {
    day: "Thursday",
    acts: [
      ...schedule.Midgard.thu,
      ...schedule.Jotunheim.thu,
      ...schedule.Vanaheim.thu,
    ],
  };
  const fri = {
    day: "Friday",
    acts: [
      ...schedule.Midgard.fri,
      ...schedule.Jotunheim.fri,
      ...schedule.Vanaheim.fri,
    ],
  };
  const sat = {
    day: "Saturday",
    acts: [
      ...schedule.Midgard.sat,
      ...schedule.Jotunheim.sat,
      ...schedule.Vanaheim.sat,
    ],
  };
  const sun = {
    day: "Sunday",
    acts: [
      ...schedule.Midgard.sun,
      ...schedule.Jotunheim.sun,
      ...schedule.Vanaheim.sun,
    ],
  };

  const days = [mon, tue, wed, thu, fri, sat, sun];
  // console.log("DAYS: ", days);

  const daySchedule = days.find((day) =>
    day.acts.find((act) => act.act === artist.name)
  );

  const dayPlaying = daySchedule.day;
  const actPlaying = daySchedule.acts.find((act) => act.act === artist.name);

  return (
    <main className="my-8">
      <BackButton />

      <section className="grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={img}
            alt={`Image of ${artist.name}`}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          ></Image>
          {artist.logoCredits && (
            <small className="mt-2 inline-block body-copy-small text-aztec-300">
              Photo by Johan von Bülow
            </small>
          )}
        </div>
        <article className=" pb-8">
          <h1
            className={`relative heading-tagline px-4 py-2 ${
              !actPlaying.cancelled && "border-2"
            } inline-block`}
          >
            {dayPlaying}
            <span className="ml-8">{actPlaying.start}</span>
            {actPlaying.cancelled && (
              <span>
                <p className="absolute left-16 -bottom-2 col-start-1 -rotate-12 text-res-xs sm:text-res-sm uppercase border-2 border-gold-600 text-gold-600 inline-block px-1 sm:px-2 sm:py-0.5">
                  Cancelled
                </p>
              </span>
            )}
          </h1>
          <h2 className="heading-2 my-6">{artist.name}</h2>
          <div className="grid grid-cols-2 pb-8">
            <article>
              <h3 className="heading-7 text-for">Genre</h3>
              <p>{artist.genre}</p>
            </article>
            <article>
              <h3 className="heading-7">Members</h3>
              <ul className="flex flex-wrap gap-x-3">
                {artist.members.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
              {/* <p>{artist.members}</p> */}
            </article>
          </div>
          <article>
            <h3 className="heading-7">About</h3>
            <p>{artist.bio}</p>
          </article>
        </article>
      </section>
    </main>
  );
}
