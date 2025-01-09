import Link from "next/link";

const TicketCard = ({ type, description, price, variant }) => {
  const variants = {
    single:
      "bg-[url('../assets/svg/diamond.svg')] bg-[right_-0.5rem_bottom_-3.5rem]",
    multiple:
      "bg-[url('../assets/svg/diamonds.svg')] bg-[right_-5rem_bottom_-3.5rem]",
  };

  return (
    <Link href="/session/reservation/flow/checkout">
      <article
        className={`px-8 pt-6 pb-2 h-full bg-aztec-950 ${variants[variant]} bg-no-repeat hover:scale-101 transition-transform	grid grid-cols-1 grid-rows-[1fr_auto_auto] gap-y-4`}
      >
        <h2 className="heading-3 text-desk-lg">{type} ticket</h2>
        <p className="">{description}</p>
        <p className="text-right heading-4 place-self-end">{price} ,-</p>
      </article>
    </Link>
  );
};

export default TicketCard;
