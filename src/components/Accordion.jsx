import { MdAdd } from "react-icons/md";

export default function Accordion({
  label,
  variant,
  name,
  optional,
  children,
}) {
  const variants = {
    primary: "heading-4",
    secondary: "body-copy font-bold",
  };

  return (
    <details
      name={name}
      className="group border-2 border-border-global px-4 py-6 md:p-6"
    >
      <summary
        className={`cursor-pointer flex items-center justify-between gap-4 ${variants[variant]}`}
      >
        <div
          className={`flex items-center gap-4 grow ${
            variant === "primary" && "justify-between"
          }`}
        >
          <MdAdd
            size="2rem"
            className={`duration-300 ease-in-out group-open:rotate-45 ${
              variant === "primary" && "order-2"
            }`}
          />
          {label}
        </div>
        {optional && (
          <span className="body-copy-small font-bold uppercase opacity-50 justify-self-end -mr-10">
            Optional
          </span>
        )}
      </summary>
      {children}
    </details>
  );
}
