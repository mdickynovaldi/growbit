import { CardItem } from "@/components/ui/card-item";
import InputName from "../../ui/input-name";
import { Progress } from "../../ui/progress";

export function Body() {
  return (
    <section id="opening" className="px-4 md:px-8 lg:px-16">
      <div className="my-10">
        <InputName />
      </div>
      <h1 className="text-white text-3xl text-center font-semibold">
        Your Goals Today!
      </h1>
      <p className="text-white text-center mb-8 mt-2">
        Do the habit and earn a shiny medal.
      </p>

      <Progress className="bg-white h-6 rounded-full" value={30} />

      <div id="cardItem" className="my-20">
        <CardItem title="Push Up" calories="100" />
        <CardItem title="Sit Up" calories="200" />
      </div>
      <a
        href="/src/pages/"
        className="w-full h-10 bg-green-400 rounded hover:bg-green-600 mb-10 text-center block text-white font-bold transition-colors"
      >
        Add
      </a>
    </section>
  );
}
