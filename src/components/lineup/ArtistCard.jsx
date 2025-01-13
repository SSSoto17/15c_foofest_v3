"use client";
import { endpointAPI } from "@/lib/endpoints";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ArtistCard({ name, slug, logo }) {
  const path = usePathname();
  const url = `${path}/single/${slug}`;
  const img = logo.startsWith("https://")
    ? logo
    : `${endpointAPI}/logos/${logo}`;

  return (
    <li
      style={{ "--url": `url(${img})` }}
      className="bg-[image:var(--url)] bg-cover grayscale-100 "
    >
      <Link
        href={url}
        className="grid aspect-square bg-gradient-to-t from-black"
      >
        {/* <Image
          src={img}
          alt={`Image of ${name}`}
          width={400}
          height={400}
          className="grayscale object-cover aspect-square col-span-full row-span-full"
        /> */}
        <h2 className="z-10 heading-4 px-4 py-2 self-end">{name}</h2>
      </Link>
    </li>
  );
}
