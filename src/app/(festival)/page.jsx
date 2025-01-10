// Descriptions for TicketCards written with chatGPT

import TicketCard from "@/components/TicketCard";
import Image from "next/image";
import hero from "@/assets/img/hero.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import ScrollToButton from "@/components/lineup/ScrollToButton";

export default function Home() {
  return (
    <main className="full-bleed">
      <section className="full-bleed gap-y-4">
        <article className="full-bleed row-start-1 row-span-4">
          <Image
            className="full-bleed h-svh object-cover row-start-1 md:h-full"
            src={hero}
            alt="Image of FooFest participants. Photo by Roberto Rendon on Unsplash."
            priority
          ></Image>
          <div className="col-start-2 row-start-1 self-center flow-space grid grid-cols-3">
            <h1 className="heading-1 uppercase text-balance col-span-full py-4 md:py-0 ">
              Claim your ticket for FooFest
            </h1>
            <MdKeyboardArrowDown
              size={50}
              className="text-global justify-self-center col-span-full md:hidden"
            />
            {/* <ScrollToButton scrollFromTop="1800" simple={true}>
              <MdKeyboardArrowDown size={50} className="text-global" />
            </ScrollToButton> */}
          </div>
        </article>
        <footer className="py-4 lg:col-start-2 lg:row-start-4 lg:row-span-2 lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="grid grid-cols-1 place-content-start gap-4 sm:grid-cols-2 lg:col-start-2 lg:col-span-full lg:grid-cols-subgrid ">
            <TicketCard
              type="Partout"
              price="799"
              variant="single"
              description="Full festival access and immerse yourself in the energy of live rock music!"
            ></TicketCard>
            <TicketCard
              type="VIP"
              price="1299"
              variant="multiple"
              description="Front-row access, exclusive lounges, and premium perks. Experience the festival like never before!"
            ></TicketCard>
          </div>
        </footer>
      </section>
    </main>
  );
}
