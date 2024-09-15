import { AddressDto } from "./order";

export interface User {
  id?: string;
  email: string;
  password?: string;
  displayName?: string;
  age?: number;
  cartId?: string;
  token?: string;
  address?: AddressDto; 
}

