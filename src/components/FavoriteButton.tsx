"use client";

import { use, useState } from "react";

export default function FavoriteButton({
  pizzaId,
  pizzaName,
  favoriteIdsPromise,
}: {
  pizzaId: string;
  pizzaName: string;
  favoriteIdsPromise: Promise<string[]>;
}) {
  const favoriteIds = use(favoriteIdsPromise);
  const [isFavorite, setIsFavorite] = useState(favoriteIds.includes(pizzaId));

  async function toggle() {
    const res = await fetch(`/api/favorites/${pizzaId}`, { method: "POST" });
    if (!res.ok) return;
    const { isFavorite: next } = (await res.json()) as { isFavorite: boolean };
    setIsFavorite(next);
    window.dispatchEvent(new Event("favorites-changed"));
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Hapus" : "Tambah"} ${pizzaName} ${isFavorite ? "dari" : "ke"} favorit`}
      className="shrink-0 text-2xl leading-none text-brand"
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
