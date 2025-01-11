import { Button } from "@headlessui/react";

export default function SiteButton({
  name,
  variant,
  size,
  formAction,
  onClick,
  isDisabled,
  type,
  children,
}) {
  const variants = {
    primary:
      "border-forest-600 body-copy bg-forest-600 font-semibold hover:bg-forest-500 hover:border-forest-500 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400",
    secondary:
      "border-2 border-forest-600 body-copy text-forest-500 hover:text-forest-400 hover:border-forest-500 disabled:text-forest-800 disabled:border-forest-800",
    small: "rounded-sm px-2 py-1",
    base: "px-6 py-3",
    form: `${
      isDisabled && "animate-pulse"
    } border-forest-600 body-copy bg-forest-600 font-semibold hover:bg-forest-500 hover:border-forest-500 disabled:bg-forest-800 disabled:border-forest-800 disabled:text-aztec-400`,
  };
  return (
    <Button
      name={name}
      onClick={onClick}
      type={type}
      // {...(formAction ? { formAction } : { onClick })}
      disabled={isDisabled}
      className={`button ${variants[variant]} ${variants[size]}`}
    >
      {children}
    </Button>
  );
}
