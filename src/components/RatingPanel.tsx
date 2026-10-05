"use client";

import { useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";
import { ratePizzaAction } from "@/app/actions";
import type { RatingSummary } from "@/lib/types";

function addRating(summary: RatingSummary, stars: number): RatingSummary {
  const count = summary.count + 1;
  const average = (summary.average * summary.count + stars) / count;
  return { average: Math.round(average * 10) / 10, count };
}

function StarButtons() {
  // Reads the pending state of the parent <form>
  const { pending } = useFormStatus();
  return (
    <div className="mt-4 flex items-center gap-1" aria-label="Beri rating">
      {[1, 2, 3, 4, 5].map((stars) => (
        <button
          key={stars}
          type="submit"
          name="stars"
          value={stars}
          disabled={pending}
          aria-label={`Beri ${stars} bintang`}
          className="text-3xl text-amber-500 hover:scale-110 disabled:opacity-40"
        >
          ★
        </button>
      ))}
      {pending && <span className="ml-2 text-sm text-ink/60">Mengirim…</span>}
    </div>
  );
}

export default function RatingPanel({
  pizzaId,
  initialSummary,
}: {
  pizzaId: string;
  initialSummary: RatingSummary;
}) {
  const [optimistic, addOptimistic] = useOptimistic(initialSummary, addRating);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(formData: FormData) {
    setError(null);
    const stars = Number(formData.get("stars"));
    addOptimistic(stars);
    const result = await ratePizzaAction(pizzaId, formData);
    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <h2 className="text-lg font-bold">Rating pelanggan</h2>
      <p className="mt-1 text-ink/70" data-testid="rating-summary">
        ★ {optimistic.average.toFixed(1)} dari {optimistic.count} rating
      </p>
      <form action={handleAction}>
        <StarButtons />
      </form>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
