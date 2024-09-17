import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { OrderService } from '../Services/order/order.service'; // Import the OrderService
import { BasketItemDto, CustomerBasketDto } from '../../Models/customerBasket';
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
  basketId:string='';
  userCart: CustomerBasketDto = {
    id: '',
    basketItems: [],
    deliveryMethodId: 0,
    shippingPrice: 0,
    paymentIntentId: '',
    clientSecret: ''
  };

  constructor(private cartService: CartService, private orderService: OrderService , private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
      this.basketId = this.cartService.userCart.id;
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
  loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    const isCartCleared = localStorage.getItem('isCartCleared');
    if (cart) {
      try {
        this.userCart = JSON.parse(cart);
      } catch (error) {
        console.error('Error loading cart from local storage:', error);
      }
    }
  }
  goToCheckout() {
    console.log(this.basketId);
    this.cartService.createPaymentIntent(this.basketId).subscribe(data=>{});
    this.router.navigate(['/checkout']);
  }


}
