import { TrackerList } from "@/components/shared/tracker-list";
import { Header } from "@/components/layout/header";

export function App() {
  return (
    <main className="w-1/2 mx-auto">
      <Header />

      <TrackerList />
    </main>
  );
}
