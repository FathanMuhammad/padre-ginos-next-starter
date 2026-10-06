import MenuExplorer from "@/components/MenuExplorer";
import PizzaOfTheDay from "@/components/PizzaOfTheDay";
import { getFavoriteIds, getPizzaOfTheDay, getPizzas } from "@/lib/data";

export default async function MenuPage() {
  // Same for every visitor: cached, so it becomes part of the static shell
  const [pizzas, pizzaOfTheDay] = await Promise.all([
    getPizzas(),
    getPizzaOfTheDay(),
  ]);
  // Changes all the time: not awaited, the promise streams to the browser
  const favoriteIdsPromise = getFavoriteIds();

  return (
    <section>
      <PizzaOfTheDay pizza={pizzaOfTheDay} />
      <h1 className="mb-6 text-3xl font-black">Menu</h1>
      <MenuExplorer pizzas={pizzas} favoriteIdsPromise={favoriteIdsPromise} />
    </section>
  );
}
