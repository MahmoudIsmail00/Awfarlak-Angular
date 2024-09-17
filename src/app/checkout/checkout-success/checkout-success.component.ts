import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { AddressDto, OrderItemDto, OrderResultDto } from '../../../Models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class CheckoutSuccessComponent implements OnInit {
  order: OrderResultDto | null = null;
  address: AddressDto | null = null;
  total: number = 0;
  orderCode: string = Math.random().toString(36).substring(2, 8).toUpperCase();
  products: OrderItemDto[] = [];

  constructor(public router: Router, private location: Location) {}

  ngOnInit(): void {
    const navigation = this.location.getState() as any;
    console.log('Navigation State:', navigation);
    if (navigation) {
      this.order = navigation.order as OrderResultDto;
      this.address = navigation.address as AddressDto;
      this.total = navigation.total as number;
      this.products = navigation.order.orderItems as OrderItemDto[];
      console.log('Order:', this.order);
      console.log('Address:', this.address);
      console.log('Total:', this.total);
      console.log('Products:', this.products);
    } else {
      console.error('No navigation state available.');
    }
  }

}
