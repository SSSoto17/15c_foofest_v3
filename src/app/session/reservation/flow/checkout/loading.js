import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <section className="cursor-default h-full flex gap-4 self-center items-center place-self-center">
      <ImSpinner2 size="32" className="loaderIcon" />
      <p className="heading-5 animate-pulse">Loading</p>
    </section>
  );
}

export function SmallLoading() {
  return (
    <section className="cursor-default flex gap-4 items-center content-center justify-self-center self-stretch">
      <ImSpinner2 size="20" className="loaderIcon" />
      <p className="body-copy animate-pulse">Loading</p>
    </section>
  );
}

export function ProcessingOrder() {
  return (
    <section className="cursor-default fixed inset-0 overscroll-contain flex place-content-center place-items-center gap-6 backdrop-blur-md backdrop-grayscale-25 backdrop-brightness-50 z-50">
      <ImSpinner2 size="32" className="loaderIcon" />
      <p className="heading-5 animate-pulse">Processing order...</p>
    </section>
  );
}
