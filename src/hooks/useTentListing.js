import { getTotalQuantity } from "@/lib/utils";
import { useTents } from "@/store/TentStore";
import { useTentActions } from "@/store/TentStore";

export default function useTentListing(error) {
  const { doubleTents, doubleTentSpaces, tripleTents, tripleTentSpaces } =
    useTents();
  const { setDouble, setTriple } = useTentActions();
  const totalTickets = getTotalQuantity("tickets");
  const { totalTentSpaces } = getTotalQuantity("tents");

  const tentListing = [
    {
      name: "tentDouble",
      label: "Double Person Tent",
      price: "299",
      error: error?.tentSetup,
      single: totalTickets === 1,
      currentTotal: doubleTents,
      setTotal: setDouble,
      overallTotal: totalTentSpaces,
    },
    {
      name: "tentTriple",
      label: "Triple Person Tent",
      price: "399",
      error: error?.tentSetup,
      single: totalTickets === 1,
      currentTotal: tripleTents,
      setTotal: setTriple,
      overallTotal: totalTentSpaces,
    },
  ];

  return tentListing;
}
