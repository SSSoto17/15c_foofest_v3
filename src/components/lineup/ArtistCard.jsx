"use client";
import { usePathname } from "next/navigation";
import { endpointAPI } from "@/lib/endpoints";
import Image from "next/image";
import Link from "next/link";

export default function ArtistCard({ name, slug, logo }) {
  const path = usePathname();
  const img = logo.startsWith("https://")
    ? logo
    : `${endpointAPI}/logos/${logo}`;

  return (
    <li>
      <Link href={`${path}/single/${slug}`} className="grid aspect-square">
        <Image
          src={img}
          width="400"
          height="400"
          alt={`Image of ${name}`}
          className="grayscale row-start-1 col-start-1 object-cover h-full"
        ></Image>
        <h2 className="z-1 heading-4 px-6 py-2 row-start-1 col-start-1 self-end bg-gradient-to-t from-black">
          {name}
        </h2>
      </Link>
    </li>
  );
}
