import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Services/order/order.service';
import { AddressDto, OrderDto, DeliveryMethod } from '../../Models/order';
import { CartService } from '../Services/cart/cart.service';
import { BasketItemDto } from '../../Models/customerBasket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CheckoutComponent implements OnInit {
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
    const orderDto: OrderDto = {
      basketId: 'example-basket-id',
      buyerEmail: 'example@example.com',
      deliveryMethodId: this.deliveryMethodId,
      shippingAddress: this.address
    };

    this.orderService.createOrder(orderDto).subscribe(
      order => {
        console.log('Order created:', order);

      },
      error => {
        console.error('Error creating order:', error);

      }
    );
  }
}
