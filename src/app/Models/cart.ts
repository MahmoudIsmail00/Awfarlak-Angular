interface CartItems {
  [productId: string]: number;
}

export interface Cart {
  id: string;
  items: CartItems;
}
