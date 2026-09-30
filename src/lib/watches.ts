import { createClient } from "@/lib/supabase/server";

export type WatchPiece = {
  name: string;
  reference: string;
  price: number;
  summary: string;
  dial: string;
  hands: string;
  bezel: string;
};

export async function getWatches(): Promise<WatchPiece[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("watches")
    .select("name, reference, price, summary, dial, hands, bezel")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
