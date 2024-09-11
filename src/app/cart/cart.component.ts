import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone : true,
  imports : [NgFor]

})
export class CartComponent implements OnInit {
  usercartItems: { product: ProductWithSpecs; quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.usercartItems = this.cartService.getCartProducts();
  }

  increaseProductQuantity(productId: string) {
    this.cartService.increaseProductQuantity(productId);
    this.usercartItems = this.cartService.getCartProducts(); // Refresh cart items
  }

  decreaseProductQuantity(productId: string) {
    this.cartService.decreaseProductQuantity(productId);
    this.usercartItems = this.cartService.getCartProducts(); // Refresh cart items
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  // Helper method to convert price from string to number
  toNumber(value: string): number {
    return parseFloat(value);
  }
}
