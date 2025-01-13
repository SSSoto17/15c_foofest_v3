// Descriptions for TicketCards written with chatGPT

import Image from "next/image";
import hero from "@/assets/img/hero.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  return (
    <main className="full-bleed gap-y-4">
      <Hero />
      <section className="grid grid-rows-subgrid row-start-5 row-span-2 sm:grid-cols-2 xl:grid-cols-3  md:row-span-1 lg:row-span-2 lg:row-start-4 place-content-end gap-x-4">
        <TicketCard type="Partout" price="799" variant="single">
          Full festival access and immerse yourself in the energy of live rock
          music!
        </TicketCard>
        <TicketCard type="VIP" price="1299" variant="multiple">
          Front-row access, exclusive lounges, and premium perks. Experience the
          festival like never before!
        </TicketCard>
      </section>
      {/* <section className="full-bleed gap-y-4"> */}
      {/* <Hero /> */}
      {/* <footer className="py-4 lg:col-start-2 lg:row-start-4 lg:row-span-2 lg:grid lg:grid-cols-3 lg:gap-6">
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
        </footer> */}
      {/* </section> */}
    </main>
  );
}

function Hero() {
  return (
    <section className="full-bleed gap-y-4 row-start-1 row-span-4">
      <Image
        className="full-bleed row-span-full h-svh object-cover row-start-1 md:h-full"
        src={hero}
        alt="Image of FooFest participants. Photo by Roberto Rendon on Unsplash."
        priority
      ></Image>
      <article className="row-span-full self-center flow-space grid">
        <h1 className="heading-1 uppercase text-balance py-4 md:py-0 ">
          Claim your ticket for FooFest
        </h1>
        <MdKeyboardArrowDown
          size={50}
          className="text-global justify-self-center md:hidden"
        />
      </article>
    </section>
  );
}

const TicketCard = ({ type, children, price, variant }) => {
  const variants = {
    single:
      "bg-[url('../assets/svg/diamond.svg')] bg-[right_-0.5rem_bottom_-3.5rem]",
    multiple:
      "bg-[url('../assets/svg/diamonds.svg')] bg-[right_-5rem_bottom_-3.5rem]",
  };

  return (
    <Link href="/session/reservation/flow/checkout">
      <article
        className={`px-8 pt-6 pb-2 h-full bg-aztec-950 ${variants[variant]} bg-no-repeat hover:scale-101 transition-transform grid gap-y-2`}
      >
        <h2 className="heading-3 text-desk-lg">{type} ticket</h2>
        <p className="">{children}</p>
        <p className="text-right heading-4 justify-self-end">{price} ,-</p>
      </article>
    </Link>
  );
};

// function Hero() {
//   return (
//     <article className="full-bleed row-start-1 row-span-4">
//       <Image
//         className="full-bleed h-svh object-cover row-start-1 md:h-full"
//         src={hero}
//         alt="Image of FooFest participants. Photo by Roberto Rendon on Unsplash."
//         priority
//       ></Image>
//       <div className="col-start-2 row-start-1 self-center flow-space grid grid-cols-3">
//         <h1 className="heading-1 uppercase text-balance col-span-full py-4 md:py-0 ">
//           Claim your ticket for FooFest
//         </h1>
//         <MdKeyboardArrowDown
//           size={50}
//           className="text-global justify-self-center col-span-full md:hidden"
//         />
//         <ScrollToButton scrollFromTop="1800" simple={true}>
//               <MdKeyboardArrowDown size={50} className="text-global" />
//             </ScrollToButton>
//       </div>
//     </article>
//   );
// }
