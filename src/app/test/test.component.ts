import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Services/order/order.service';
import { AddressDto, OrderDto, DeliveryMethod } from '../../Models/order';
import { CartService } from '../Services/cart/cart.service';
import { BasketItemDto } from '../../Models/customerBasket';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  address: AddressDto = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  };
  deliveryMethodId: number = 1;
  deliveryMethods: DeliveryMethod[] = [];
  paymentMethod: string = 'cod'; // Default payment method
  usercartItems: BasketItemDto[] = [];

  constructor(private orderService: OrderService, private cartService: CartService) {}

  ngOnInit(): void {
    this.orderService.getAllDeliveryMethods().subscribe(methods => {
      this.deliveryMethods = methods;
    });
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
    });
  }

  calculateTotal(): number {
    return this.usercartItems.reduce((total, item) => total + (item.Quantity * item.Price), 0);
  }

  submitOrder() {
    if (!this.address || this.usercartItems.length === 0) {
      alert('Please enter a valid shipping address and ensure the cart is not empty.');
      return;
    }
    const orderDto: OrderDto = {
      basketId: 'example-basket-id',
      buyerEmail: 'example@example.com',
      deliveryMethodId: this.deliveryMethodId,
      shippingAddress: this.address
    };
    this.orderService.createOrder(orderDto).subscribe(
      order => {
        console.log('Order created:', order);
        alert('Order placed successfully!');
      },
      error => {
        console.error('Error creating order:', error);
        alert('Failed to place the order. Please try again.');
      }
    );
  }
}
