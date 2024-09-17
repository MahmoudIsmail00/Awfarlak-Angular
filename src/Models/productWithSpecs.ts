export interface ProductWithSpecs {
  id:number,
  name:string,
  description:string,
  price:number,
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
  quantity:number,
  productId:number
}

export interface ProductWithSpecsCreationDTO {
  name: string;
  description: string;
  price: number;
  pictureUrl?: string;
  imageFile?: File;
  storage: number | null;
  ram: number | null;
  cpu: string | null;
  gpu: string | null;
  screen: string | null;
  color: string | null;
  keyboard: string | null;
  warranty: string | null;
  panel: string | null;
  touchscreen: boolean | null;
  quantity: number;
  subCategoryId: number;
  brandId: number;
}
