import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../../Models/product';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../environment';
import { WishList } from '../../../Models/wishlist';
import { ProductWithSpecs, ProductWithSpecsCreationDTO } from '../../../Models/productWithSpecs';
import { SubCategoryWithType } from '../../../Models/subCategory';
import { Brand } from '../../../Models/brand';

@Injectable()
export class ProductsService {
  ProductsURL = `${environment.apiUrl}/Products/`;
  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // GetAll Methods
  getAllProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.ProductsURL + 'GetAllProducts', {
      headers,
    });
  }


  getAllBrands(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.ProductsURL + 'GetProductBrands/Brands', {
      headers,
    });
  }

  getAllSubCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(
      this.ProductsURL + 'GetProductSubCategories/Types',
      { headers }
    );
  }
  getAllDeliveryMethods(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(
      this.ProductsURL + 'GetDeliveryMethods/Delivery',
      { headers }
    );
  }
  // Get Product By Id
  getProductbyId(id: number): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.ProductsURL}GetProductById/${id}`, {headers,});
  }

  // Get Products by SubCategory
  getProductsbySubCategoryId(SubCategoryid: number): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(
      `${this.ProductsURL}GetProductsBySubCat/${SubCategoryid}`,
      { headers }
    );
  }

  getProductWithSpecs(productId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      `${this.ProductsURL}GetProductWithSpecs/${productId}`,
      { headers }
    );
  }
  getProductsWithSpecsBySubCategoryId(subId:number): Observable<ProductWithSpecs[]>{
    const headers = this.getHeaders();
    return this.http.get<ProductWithSpecs[]>(`${this.ProductsURL}GetProductsBySubCategoryWithSpecs/${subId}`, {headers,});
  }
  getAllSpecs(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.ProductsURL}GetProductSpecs/Specs`, {
      headers,
    });
  }
  getAllTypes(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.ProductsURL}GetAllTypes`, {
      headers,
    });
  }
   //create new subcategory
   createNewSubCategory(subCategory:SubCategoryWithType):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<SubCategoryWithType>(`${this.ProductsURL}CreateNewSubCategory`, subCategory ,{headers});
  }
  // Get subcategory By Id
  getsubcategorybyId(id: number): Observable<SubCategoryWithType> {
    const headers = this.getHeaders();
    return this.http.get<SubCategoryWithType>(`${this.ProductsURL}GetSubCategoryById/${id}`, {headers,});
  }

  //update Product
  UpdateExistingSubCategory(SubCategoryId:number|null,subCategory:SubCategoryWithType):Observable<any>{
    const headers = this.getHeaders();
    return this.http.put<ProductWithSpecsCreationDTO>(`${this.ProductsURL}UpdateSubCategory/${SubCategoryId}`, subCategory ,{headers});
  }

  //Delete subcategory
  DeleteSubcategory(id:number):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.ProductsURL}DeleteSubCategory/${id}`, {headers,});
  }

  getWishListProducts(userWishList: WishList): Product[] {
    this.getAllProducts().subscribe((products: Product[]) => {
      const wishListProducts: Product[] = [];
      products.forEach((product) => {
        if (userWishList.data.includes(product.id.toString())) {
          wishListProducts.push(product);
        }
      });
      return wishListProducts;
    });
    return [];
  }

  //create new product
  createNewProduct(product:ProductWithSpecsCreationDTO):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<ProductWithSpecsCreationDTO>(`${this.ProductsURL}CreateProductWithSpecs`, product ,{headers});
  }

  //update Product
  UpdateExistingProduct(productId:number|null,product:ProductWithSpecsCreationDTO):Observable<any>{
    const headers = this.getHeaders();
    return this.http.put<ProductWithSpecsCreationDTO>(`${this.ProductsURL}UpdateProductWithSpecs/${productId}`, product ,{headers});
  }

  //Delete Product
  DeleteProduct(id:number):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.ProductsURL}DeleteProduct/${id}`, {headers,});
  }


  //////////////////////////////////// Brands ////////////////////////////////////////////
  CreateNewBrand(brand:Brand):Observable<Brand>{
    const headers = this.getHeaders();
    return this.http.post<Brand>(`${this.ProductsURL}CreateNewBrand`, brand ,{headers});
  }

  UpdateExistingBrand(brandId:number,brand:Brand):Observable<Brand>{
    const headers = this.getHeaders();
    return this.http.put<Brand>(`${this.ProductsURL}UpdateBrand/${brandId}`, brand ,{headers});
  }

  DeleteBrand(id:number):Observable<Brand>{
    const headers = this.getHeaders();
    return this.http.delete<Brand>(`${this.ProductsURL}DeleteBrand/${id}`, {headers,});
  }

  GetBrandById(id: number): Observable<Brand> {
    const headers = this.getHeaders();
    return this.http.get<Brand>(`${this.ProductsURL}GetBrandById/${id}`, {headers,});
  }
}
