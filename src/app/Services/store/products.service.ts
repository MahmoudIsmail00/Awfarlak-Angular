import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../Models/product';

@Injectable()
export class ProductsService {
  apiUrl = 'https://localhost:7082/api/Products/';
  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTerm.asObservable();

  constructor(private http: HttpClient) {}

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getAllProducts(): Observable<Product[]> {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1haG1vdWRAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1haG1vdWQiLCJuYmYiOjE3MjU3MDM4NzksImV4cCI6MTcyNTc5MDI3OSwiaWF0IjoxNzI1NzAzODc5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDgyIn0.lQ33BtBHxx8uTSQtDNGrN3x5ZrgItIojIiPgCkdDELA';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Product[]>(this.apiUrl + 'GetProducts', { headers });
  }

  // getAllBrands(): Observable<any[]> {
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1haG1vdWRAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1haG1vdWQiLCJuYmYiOjE3MjU3MDM4NzksImV4cCI6MTcyNTc5MDI3OSwiaWF0IjoxNzI1NzAzODc5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDgyIn0.lQ33BtBHxx8uTSQtDNGrN3x5ZrgItIojIiPgCkdDELA';

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<Product[]>(this.apiUrl2, { headers });
  // }
}
