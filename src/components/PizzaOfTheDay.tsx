import Image from "next/image";
import Link from "next/link";
import Dismissible from "@/components/Dismissible";
import { formatPrice, lowestPrice } from "@/lib/format";
import type { Pizza } from "@/lib/types";

export default function PizzaOfTheDay({ pizza }: { pizza: Pizza }) {
  return (
    <Dismissible>
      <aside className="mb-8 overflow-hidden rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={160}
            height={160}
            className="aspect-square w-32 rounded-2xl object-cover shadow sm:w-40"
          />
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Pizza of the Day
            </span>
            <h2 className="text-2xl font-black">
              <Link href={`/pizza/${pizza.id}`} className="hover:text-brand">
                {pizza.name}
              </Link>
            </h2>
            <p className="text-sm text-ink/70">{pizza.description}</p>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-amber-200/60 px-2.5 py-0.5 font-medium text-amber-900">
                {pizza.category}
              </span>
              <span className="font-bold">
                mulai {formatPrice(lowestPrice(pizza))}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </Dismissible>
  );
}
