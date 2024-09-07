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
  token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1haG1vdWRAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1haG1vdWQiLCJuYmYiOjE3MjU3MDM4NzksImV4cCI6MTcyNTc5MDI3OSwiaWF0IjoxNzI1NzAzODc5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDgyIn0.lQ33BtBHxx8uTSQtDNGrN3x5ZrgItIojIiPgCkdDELA';

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
    return this.http.get<Product[]>(this.ProductsURL + 'GetProducts', { headers });
  }

  getAllBrands(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductBrands/Brands', { headers });
  }

  getAllSubCategories(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductSubCategories/Types', { headers });
  }

  // Get Product By Id
  getProductbyId(id: number): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(this.ProductsURL + 'GetProductById/' + id, { headers });
  }

  //Get Products by SubCategory
  getProductsbySubCategoryId(SubCategoryid:number):Observable<Product[]>{
    const headers = new HttpHeaders({Authorization: `Bearer ${this.token}`});
    return this.http.get<Product[]>(this.ProductsURL + 'GetProductsBySubCat/' + SubCategoryid , { headers });
  }

}
