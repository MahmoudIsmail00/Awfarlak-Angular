import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class ProductsService {
  ProductsURL = 'https://localhost:7082/api/Products/';
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
    return this.http.get<Product[]>(this.ProductsURL + 'GetAllProducts', { headers });
  }

  getAllBrands(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.ProductsURL + 'GetProductBrands/Brands', { headers });
  }

  getAllSubCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.ProductsURL + 'GetProductSubCategories/Types', { headers });
  }

  // Get Product By Id
  getProductbyId(id: number): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(this.ProductsURL + 'GetProductById/' + id, { headers });
  }

  // Get Products by SubCategory
  getProductsbySubCategoryId(SubCategoryid: number): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductsBySubCat/' + SubCategoryid, { headers });
  }
}
