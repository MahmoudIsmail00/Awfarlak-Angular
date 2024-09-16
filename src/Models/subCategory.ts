export interface SubCategory {
  id:number,
  name:string
}

export interface SubCategoryWithType extends SubCategory{
  typeId:number
}

export interface ProductType{
  id:number,
  name:string
}
