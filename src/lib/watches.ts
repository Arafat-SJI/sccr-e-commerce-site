import { createClient } from "@/lib/supabase/server";

export type WatchPiece = {
  name: string;
  reference: string;
  price: number;
  summary: string;
  dial: string;
  hands: string;
  bezel: string;
  image_url?: string | null;
};

const columns = "name, reference, price, summary, dial, hands, bezel, image_url";
const columnsWithoutImage = "name, reference, price, summary, dial, hands, bezel";

export async function getWatches(): Promise<WatchPiece[]> {
  const supabase = await createClient();
  const first = await supabase.from("watches").select(columns).order("sort_order", { ascending: true });

  if (first.error && first.error.message.includes("image_url")) {
    const retry = await supabase
      .from("watches")
      .select(columnsWithoutImage)
      .order("sort_order", { ascending: true });

    if (retry.error) {
      throw new Error(retry.error.message);
    }

    return retry.data ?? [];
  }

  if (first.error) {
    throw new Error(first.error.message);
  }

  return first.data ?? [];
}
