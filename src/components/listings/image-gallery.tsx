"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ListingImage } from "@/lib/db/types";

export function ImageGallery({ images }: { images: ListingImage[] }) {
  const [current, setCurrent] = useState(0);
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  if (sorted.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? sorted.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === sorted.length - 1 ? 0 : c + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted group">
        <Image
          src={sorted[current].url}
          alt={sorted[current].alt_text || "Property photo"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />

        {sorted.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
          <Expand className="h-3 w-3" />
          {current + 1} / {sorted.length}
        </div>
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === current
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text || ""}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
