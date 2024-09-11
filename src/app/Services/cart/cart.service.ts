import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Cart } from '../../../Models/cart';
import { environment } from '../environment';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { Product } from '../../../Models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = `${environment.apiUrl}/basket/`;
  userCart: Cart = { id: 0, items: {} };
  private cart: { product: ProductWithSpecs; quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: ProductWithSpecs; quantity: number }[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.initializeCart().subscribe();
  }

  addToCart(product: ProductWithSpecs, quantity: number): void {
    const existingProductIndex = this.cart.findIndex(item => item.product.id === product.id);

    if (existingProductIndex >= 0) {
      // Update quantity of the existing product
      this.cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      this.cart.push({ product, quantity });
    }

    // Update the userCart items
    this.userCart.items[product.id] = (this.userCart.items[product.id] || 0) + quantity;
    this.cartSubject.next(this.cart);
    this.updateUserCartOnServer();
  }

  // Other methods remain the same
  getCartItems(): { product: ProductWithSpecs; quantity: number }[] {
    return this.cart;
  }

  getUserCart(id: string | null): void {
    if (id) {
      this.http.get<Cart>(`${this.apiUrl}/${id}`).pipe(
        map((cart) => {
          this.userCart = cart;
        }),
        catchError(error => {
          console.log('Error fetching cart:', error);
          return throwError(error);
        })
      ).subscribe(
        (cart) => console.log('Fetched user cart:', cart),
        (error) => console.log('Error fetching cart:', error)
      );
    } else {
      console.log('User is not registered, no cart ID provided');
    }
  }

  initializeCart(): Observable<Cart> {
    const newCart = { id: this.userCart.id, items: {} };
    return this.http.post<Cart>(this.apiUrl, newCart).pipe(
      map((cart) => {
        this.userCart = cart;
        return cart;
      }),
      catchError(error => {
        console.log('Error initializing cart:', error);
        return throwError(error);
      })
    );
  }

  getProductQuantity(id: number): number {
    const cartItem = this.userCart.items[id];
    return cartItem !== undefined ? cartItem : 0;
  }

  clearCart(): void {
    this.userCart.items = {};
    this.updateUserCartOnServer();
  }

  updateUserCartOnServer(): void {
    if (this.userCart.id !== 0) {
      this.http.post<Cart>(this.apiUrl, this.userCart).pipe(
        catchError(error => {
          console.log('Error updating cart:', error);
          return throwError(error);
        })
      ).subscribe(
        (response) => console.log('Cart updated successfully', response),
        (error) => console.log('Error updating cart:', error)
      );
    }
  }

  getProductById(id: number): ProductWithSpecs | undefined {
    return this.cart.find(item => item.product.id === id)?.product;
  }

  increaseProductQuantity(id: number): void {
    if (this.userCart.items[id]) {
      this.userCart.items[id] += 1;
      const cartItem = this.cart.find(item => item.product.id === id);
      if (cartItem) {
        cartItem.quantity += 1;
      }
    } else {
      const product = this.getProductById(id);
      if (product) {
        this.userCart.items[id] = 1;
        this.cart.push({ product, quantity: 1 });
      }
    }
    this.cartSubject.next(this.cart);
    this.updateUserCartOnServer();
  }

  decreaseProductQuantity(id: number): void {
    if (this.userCart.items[id] && this.userCart.items[id] > 1) {
      this.userCart.items[id] -= 1;
      const cartItem = this.cart.find(item => item.product.id === id);
      if (cartItem) {
        cartItem.quantity -= 1;
      }
    } else {
      delete this.userCart.items[id];
      this.cart = this.cart.filter(item => item.product.id !== id); // Remove the product from local cart
    }
    this.cartSubject.next(this.cart);
    this.updateUserCartOnServer();
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}
