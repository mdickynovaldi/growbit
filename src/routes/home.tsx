import { Header } from "@/components/layout/header";
import { TrackerList } from "@/components/shared/tracker-list";

export function Home() {
  return (
    <main className="w-1/2 mx-auto">
      <Header />

      <TrackerList />
    </main>
  );
}
