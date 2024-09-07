import { AuthService } from './../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Cart } from '../../Models/cart';
@Injectable()
export class CartService {
  apiUrl = 'http://localhost:3000/carts';
  userCart: Cart = { id: 'unRegisteredUserCartId', items: {} };

  getUserCart(id: string | null): void {
    console.log(id);
    this.http
      .get<Cart>(`${this.apiUrl}/${id}`)
      .pipe(
        map((cart) => {
          console.log(cart);
          this.userCart = cart;
        })
      )
      .subscribe();
  }

  initializeCart(): Observable<Cart> {
    const newCart = { items: {} };
    return this.http.post<Cart>(this.apiUrl, newCart);
  }

  getProductQuantity(id: string): number {
    const cartItem = this.userCart.items;
    if (cartItem && cartItem[id] !== undefined) {
      return cartItem[id];
    } else {
      return 0;
    }
  }
  clearCart(): void {
    this.userCart = { id: this.userCart.id, items: {} };
    this.updateUserCartOnServer();
  }

  updateUserCartOnServer(): void {
    console.log('update server');
    if (this.userCart.id !== 'unRegisteredUserCartId') {
      this.http
        .put<Cart>(`${this.apiUrl}/${this.userCart.id}`, this.userCart)
        .subscribe(
          (response) => {
            console.log('cart updated successfully', response);
          },
          (err) => {
            console.log('err err err', err);
          }
        );
    }
  }

  increaseProductQuantity(id: string) {
    if (this.userCart?.items[id]) {
      this.userCart.items[id] += 1;
      console.log(this.userCart);
    } else {
      this.userCart.items[id] = 1;
      console.log(this.userCart);
    }
    this.updateUserCartOnServer();
  }

  decreaseProductQuantity(id: string) {
    if (this.userCart.items[id] && this.userCart.items[id] > 1) {
      this.userCart.items[id] -= 1;
      console.log(this.userCart);
    }
    this.updateUserCartOnServer();
    console.log(this.userCart);
  }
  constructor(private http: HttpClient) {}
}
