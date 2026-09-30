"use client";

import { useState } from "react";
import { WatchFace } from "@/components/watch-face";

type WatchImageProps = {
  name: string;
  reference: string;
  imageUrl?: string | null;
  dial?: string;
  hands?: string;
  bezel?: string;
};

export function WatchImage({ name, reference, imageUrl, dial, hands, bezel }: WatchImageProps) {
  const [stage, setStage] = useState<"remote" | "local" | "face">(imageUrl ? "remote" : "local");

  if (stage === "face" && dial && hands && bezel) {
    return <WatchFace dial={dial} hands={hands} bezel={bezel} label={`${name} watch face`} />;
  }

  const src = stage === "remote" && imageUrl ? imageUrl : `/watches/${reference}.svg`;

  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-contain"
      onError={() => setStage(stage === "remote" ? "local" : "face")}
    />
  );
}
