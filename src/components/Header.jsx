export default function Header({ children }) {
  return (
    <header className="col-span-full bg-main-background drop-shadow-main z-50">
      <nav className="py-4 flex w-full items-center justify-between">
        {children}
      </nav>
    </header>
  );
}
