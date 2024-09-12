import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../../Models/product';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../environment';
import { WishList } from '../../../Models/wishlist';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';

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


  
}
