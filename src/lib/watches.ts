// COMPLETE updated file — existing code preserved with changes merged in
import { createClient } from '@/lib/supabase/server';

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

export async function getWatches(): Promise<WatchPiece[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('watches')
    .select('name, reference, price, summary, dial, hands, bezel, image_url')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
