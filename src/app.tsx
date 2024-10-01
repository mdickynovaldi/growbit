import { Body } from "./components/layouts/home/body";
import { Header } from "./components/layouts/home/header";

export function App() {
  return (
    <main className="w-1/2 mx-auto">
      <Header />
      <Body />
    </main>
  );
}
