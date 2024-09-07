import { ProductsService } from './../../Services/store/products.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart/cart.service';
import { Cart } from '../../Models/cart';
import { Product } from '../../Models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
})
export class CartComponent implements OnInit {
  usercartItems: { product: Product; quantity: number }[] = [];
  userCart!: Cart;

  calculateTotal() {
    return this.usercartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  createFakeOrder() {
    console.log('Order created');
    this.cartService.clearCart();
    this.router.navigate(['/alert']);
  }

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userCart = this.cartService.userCart;
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.usercartItems = products
          .filter((product) => this.userCart.items.hasOwnProperty(product.id))
          .map((product) => ({
            product,
            quantity: this.userCart.items[product.id],
          }));
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
