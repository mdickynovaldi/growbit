export function Header() {
  return (
    <section>
      <a href="/">
        <div className="flex gap-3 items-center">
          <img width={100} src="./src/assets/logo.svg" alt="logo" />
          <span className="text-3xl text-white font-bold">Growbit</span>
        </div>
      </a>
    </section>
  );
}
