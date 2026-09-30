// Full file content here
import { useCart } from '@/components/cart-provider';
import { formatPrice } from '@/lib/catalog';
import Image from 'next/image';
import WatchFace from '@/components/watch-face';

interface CartItemProps {
  item: CartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity >= 1) {
      updateQuantity(item.reference, quantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.reference);
  };

  const imageUrl = item.image_url || `/watches/${item.reference}.jpg`;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <Image
        src={imageUrl}
        alt={item.name}
        width={100}
        height={100}
        onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
      />
      <div>
        <h3>{item.name}</h3>
        <p>{item.reference}</p>
        <p>{formatPrice(item.price)}</p>
      </div>
      <input
        type="number"
        value={item.quantity}
        onChange={handleQuantityChange}
        min={1}
        className="w-16 text-center"
      />
      <p>{formatPrice(item.price * item.quantity)}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}
