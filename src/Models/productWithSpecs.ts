export interface ProductWithSpecs {
  id:string,
  name:string,
  description:string,
  price:string,
  pictureUrl:string,
  productSubCategoryName :string,
  productBrandName :string,
  productTypeName :string;
  storage:string|null,
  ram :string|null,
  cpu:string|null,
  gpu:string|null,
  screen:string|null,
  color:string|null,
  keyboard:string|null,
  warranty:string|null,
  panel:string|null,
  touchscreen:string|null,
  quantity:number
}
