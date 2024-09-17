import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order/order.service';
import {  OrderResultDto } from '../../Models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: OrderResultDto[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(orders => {
      this.orders = orders;
      // console.log(this.orders);

    });
  }
}
