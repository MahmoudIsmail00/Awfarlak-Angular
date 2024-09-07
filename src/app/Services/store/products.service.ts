import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../Models/product';

@Injectable()
export class ProductsService {
  ProductsURL = 'https://localhost:7082/api/Products/';
  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();
  token = "";

  constructor(private http: HttpClient) {}


  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
  // GetAll Methods
  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product[]>(this.ProductsURL + 'GetProducts', { headers });
  }
  getAllBrands(): Observable<any[]> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductBrands/Brands', { headers });
  }
  getAllSubCategories():Observable<any[]> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductSubCategories/Types', { headers });
  };

  //Get Produc By Id
  getProductbyId(id:number):Observable<Product>{
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product>(this.ProductsURL + 'GetProductById/' + id , { headers });
  }

  //Get Products by SubCategory
  getProductsbySubCategoryId(SubCategoryid:number):Observable<Product[]>{
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductsBySubCat/' + SubCategoryid , { headers });
  }

}
