// Full file content here
import { getWatches } from '@/lib/watches';
import ProductCard from '@/components/product-card';

export default async function AllProductPage() {
  const watches = await getWatches();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {watches.map((watch) => (
        <ProductCard key={watch.reference} watch={watch} />
      ))}
    </div>
  );
}
