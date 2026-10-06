"use client";

import { useState } from "react";

export default function Dismissible({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="relative">
      {children}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Tutup banner"
        className="absolute top-4 right-4 rounded-full bg-black/10 px-3 py-1 text-xs font-semibold hover:bg-black/20"
      >
        ✕ Tutup
      </button>
    </div>
  );
}
