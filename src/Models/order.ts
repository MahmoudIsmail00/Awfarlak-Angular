export interface AddressDto {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderDto{
  basketId : string;
  buyerEmail : string;
  deliveryMethodId : number | null;
  shippingAddress: AddressDto;
}


export interface OrderItemDto {
  productItemId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface OrderResultDto {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shippingAddress: AddressDto;
  deliveryMethod: string;
  orderStatus: string;
  orderItems: OrderItemDto[];
  subTotal: number;
  shippingPrice: number;
  total: number;
}

export interface DeliveryMethod {
  id: number;
  shortName: string;
  price: number;
  description?:string;
  deliveryTime?:string;
}
