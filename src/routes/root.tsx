import { Outlet } from "react-router-dom";

export async function loader() {
  // Logged in / authenticated user
  return null;
}

export function RootRoute() {
  return (
    <main className="max-w-2xl w-full mx-auto">
      <Outlet />
    </main>
  );
}
