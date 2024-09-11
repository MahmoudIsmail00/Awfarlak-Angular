interface CartItems {
  [productId: string]: number;
}

export interface Cart {
  id: number;
  items: CartItems;
}
