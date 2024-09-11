import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class CartComponent implements OnInit {
  usercartItems: { product: ProductWithSpecs; quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
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
}
