export function Header() {
  return (
    <header>
      <a href="/" className="inline-block hover:opacity-75 transition">
        <div className="inline-flex gap-3 items-center">
          <img width={100} src="/images/logo.svg" alt="logo" />
          <span className="text-3xl text-white font-bold">Growbit</span>
        </div>
      </a>
    </header>
  );
}
