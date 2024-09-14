import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResultDto, AddressDto, DeliveryMethod, OrderDto } from '../../../Models/order';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders/`;

  constructor(private http: HttpClient) {}

  createOrder(orderDto: OrderDto): Observable<OrderResultDto> {
    return this.http.post<OrderResultDto>(this.baseUrl + "CreateOrder", orderDto);
  }

  getAllDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(`${this.baseUrl}GetAllDeliveryMethods`);
  }
}
