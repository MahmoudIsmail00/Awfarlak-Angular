import { AddressDto } from "./order";

export interface User {
  id?: string;
  email: string;
  password?: string;
  displayName?: string;
  age?: number;
  cartId?: string;
  token?: string;
  address: AddressDto;
  roles: string[];
}


export interface UserDto{
  userId:string|null,
  displayName:string,
  email:string,
  roles:string[]
}

export interface UpdateUserRoleDto{
  email:string,
  newRole:string
}

export interface Role{
  id:string,
  name:string,
  normalizedName:string,
  concurrencyStamp:string|null
}
