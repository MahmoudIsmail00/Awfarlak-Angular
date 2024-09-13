export interface BasketItemDto {
  Id: number;
  ProductName: string;
  Price: number;
  Quantity: number;
  PictureUrl: string;
  brand: string;
  type: string;
}


export interface CustomerBasketDto {
  id: string;
  basketItems: BasketItemDto[];
  deliveryMethodId?: number;
  shippingPrice: number;
  paymentIntentId?: string;
  clientSecret?: string;
}
