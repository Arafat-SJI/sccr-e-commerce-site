// Full file content here
export interface CartItem {
  reference: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  dial?: string;
  hands?: string;
  bezel?: string;
}

export function getCart(): CartItem[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addItemToCart(cart: CartItem[], item: CartItem): CartItem[] {
  const existingItem = cart.find((i) => i.reference === item.reference);
  if (existingItem) {
    return cart.map((i) =>
      i.reference === item.reference
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
  }
  return [...cart, item];
}

export function updateCartItemQuantity(cart: CartItem[], reference: string, quantity: number): CartItem[] {
  return cart.map((item) =>
    item.reference === reference ? { ...item, quantity } : item
  );
}

export function removeItemFromCart(cart: CartItem[], reference: string): CartItem[] {
  return cart.filter((item) => item.reference !== reference);
}

export function clearCart(): void {
  localStorage.removeItem('cart');
}
