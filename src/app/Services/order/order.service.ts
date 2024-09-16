import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { OrderResultDto, AddressDto, DeliveryMethod, OrderDto } from '../../../Models/order';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  private deliveryMethodSubject = new BehaviorSubject<number | null>(null);
  deliveryMethod$ = this.deliveryMethodSubject.asObservable();

  constructor(private http: HttpClient) {}

  createOrder(orderDto: OrderDto): Observable<OrderResultDto> {
    return this.http.post<OrderResultDto>(`${this.baseUrl}/CreateOrder`, orderDto).pipe(
      catchError(this.handleError<OrderResultDto>('createOrder'))
    );
  }

  getUserOrders(): Observable<OrderResultDto[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get<OrderResultDto[]>(`${this.baseUrl}/GetAllOrdersForUser`, { headers }).pipe(
      catchError(this.handleError<OrderResultDto[]>('getUserOrders', []))
    );
  }

  getOrderById(id: number): Observable<OrderResultDto> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get<OrderResultDto>(`${this.baseUrl}/getorderbyid/${id}`, { headers }).pipe(
      catchError(this.handleError<OrderResultDto>('getOrderById'))
    );
  }

  getAllDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(`${this.baseUrl}/GetAllDeliveryMethods`).pipe(
      catchError(this.handleError<DeliveryMethod[]>('getAllDeliveryMethods'))
    );
  }

  setDeliveryMethod(methodId: number) {
    this.deliveryMethodSubject.next(methodId);
  }

  getDeliveryMethod() {
    return this.deliveryMethodSubject.getValue();
  }

  private getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser?.token || null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
