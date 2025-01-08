import Image from "next/image";
// import picture from "../../assets/tester/A_Perfect_Circle_Logo_2011_-_Michael_John_Stinsman_InvisibleStudio_Productions.png";
import picture from "../../assets/tester/terminalist.jpg";
// import picture from "../../assets/tester/Tool_logo_2006.svg";
import Link from "next/link";

const ArtistCard = ({ name, slug, img }) => {
  // console.log("slug:", slug);

  return (
    <li>
      <Link href={`/lineup/artists/single/${slug}`} className="grid aspect-square">
        <Image src={picture} width="400" height="400" alt={`Image of ${name}`} className="grayscale row-start-1 col-start-1 object-cover h-full"></Image>
        <h3 className="z-1 heading-4 px-6 py-2 row-start-1 col-start-1 self-end bg-gradient-to-t from-black">{name}</h3>
      </Link>
    </li>
  );
};

export default ArtistCard;
