// Full file content here
import { WatchPiece } from '@/lib/watches';
import { formatPrice } from '@/lib/catalog';
import { useCart } from '@/components/cart-provider';
import Image from 'next/image';
import WatchFace from '@/components/watch-face';

interface ProductCardProps {
  watch: WatchPiece;
}

export default function ProductCard({ watch }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(watch.reference);
  };

  const imageUrl = watch.image_url || `/watches/${watch.reference}.jpg`;

  return (
    <div className="border p-4">
      <Image
        src={imageUrl}
        alt={watch.name}
        width={200}
        height={200}
        onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
      />
      <h2>{watch.name}</h2>
      <p>{watch.reference}</p>
      <p>{formatPrice(watch.price)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
