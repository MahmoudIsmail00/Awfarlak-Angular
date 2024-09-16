import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart/cart.service';
import { BasketItemDto } from '../../../Models/customerBasket';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [NgFor],
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  usercartItems: BasketItemDto[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
    });
  }

 
}
