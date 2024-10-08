import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-2xl mb-8 animate-pulse">Oops! Page not found</p>
      <div className="animate-spin inline-block w-20 h-20 border-4 border-white rounded-full border-t-transparent mb-8"></div>
      <div>
        <Link to="/">
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
