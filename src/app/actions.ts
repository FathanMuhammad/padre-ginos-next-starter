"use server";

import { refresh } from "next/cache";
import { pizzaExists, toggleFavorite } from "@/lib/data";
import { shouldFail, simulateLatency } from "@/lib/demo";

export type ActionResult = { ok: true } | { ok: false; error: string };

// Anyone can POST to a Server Action, so treat every argument as untrusted input
export async function toggleFavoriteAction(
  pizzaId: string,
): Promise<ActionResult> {
  if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
    return { ok: false, error: "Pizza tidak dikenal." };
  }

  await simulateLatency("write");
  if (await shouldFail()) {
    return { ok: false, error: "Gagal menyimpan favorit. Coba lagi." };
  }

  await toggleFavorite(pizzaId);
  // Re-render the current page on the server: hearts and header update together
  refresh();
  return { ok: true };
}

// "use server";

// import { refresh } from "next/cache";
// import { addRating, pizzaExists, toggleFavorite } from "@/lib/data";
// import { shouldFail, simulateLatency } from "@/lib/demo";
// import { parseStars } from "@/lib/format";

// export type ActionResult = { ok: true } | { ok: false; error: string };

// // Anyone can POST to a Server Action, so treat every argument as untrusted input
// export async function toggleFavoriteAction(
//   pizzaId: string,
// ): Promise<ActionResult> {
//   if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
//     return { ok: false, error: "Pizza tidak dikenal." };
//   }

//   await simulateLatency("write");
//   if (await shouldFail()) {
//     return { ok: false, error: "Gagal menyimpan favorit. Coba lagi." };
//   }

//   await toggleFavorite(pizzaId);
//   // Re-render the current page on the server: hearts and header update together
//   refresh();
//   return { ok: true };
// }

// export async function ratePizzaAction(
//   pizzaId: string,
//   formData: FormData,
// ): Promise<ActionResult> {
//   if (typeof pizzaId !== "string" || !(await pizzaExists(pizzaId))) {
//     return { ok: false, error: "Pizza tidak dikenal." };
//   }

//   const rawStars = formData.get("stars");
//   const stars = parseStars(rawStars);
//   if (stars === null) {
//     return { ok: false, error: "Rating harus berupa angka 1 sampai 5." };
//   }

//   await simulateLatency("write");
//   if (await shouldFail()) {
//     return { ok: false, error: "Gagal mengirim rating. Coba lagi." };
//   }

//   await addRating(pizzaId, stars);
//   refresh();
//   return { ok: true };
// }
