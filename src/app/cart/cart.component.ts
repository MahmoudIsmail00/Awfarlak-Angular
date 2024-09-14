import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { OrderService } from '../Services/order/order.service'; // Import the OrderService
import { BasketItemDto } from '../../Models/customerBasket';
import { AddressDto, OrderDto } from '../../Models/order'; // Import your models
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [NgFor, NgIf ]
})
export class CartComponent implements OnInit {
  usercartItems: BasketItemDto[] = [];
  isCartCleared = false;


  constructor(private cartService: CartService, private orderService: OrderService , private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
    });
    this.cartService.isCartCleared$.subscribe(isCleared => {
      this.isCartCleared = isCleared;
    });

   
  }

  increaseProductQuantity(productId: number) {
    this.cartService.increaseProductQuantity(productId);
  }

  decreaseProductQuantity(productId: number) {
    this.cartService.decreaseProductQuantity(productId);
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }


}
