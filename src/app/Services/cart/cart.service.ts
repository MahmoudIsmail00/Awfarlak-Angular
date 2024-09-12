import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Cart } from '../../../Models/cart';
import { environment } from '../environment';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { ProductsService } from '../store/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = `${environment.apiUrl}/basket/`;
  userCart: Cart = { id: 0, items: {} };
  private cart: { product: ProductWithSpecs; quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: ProductWithSpecs; quantity: number }[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private productService: ProductsService) {
    this.initializeCartFromLocalStorage();
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.userCart));
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        this.userCart = JSON.parse(cart);
        this.cart = Object.entries(this.userCart.items).map(([id, quantity]) => {
          const productId = parseInt(id, 10);
          const product = this.getProductById(productId);
          return product ? { product, quantity } : null;
        }).filter(item => item !== null) as { product: ProductWithSpecs; quantity: number }[];
        this.cartSubject.next(this.cart);
      } catch (error) {
        console.error('Error loading cart from local storage:', error);
      }
    }
  }

  private initializeCartFromLocalStorage() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: ProductWithSpecs, quantity: number): void {

    const existingProductIndex = this.cart.findIndex(item => item.product.id === product.id);
    if (existingProductIndex >= 0) {
      this.cart[existingProductIndex].quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }

    this.userCart.items[product.id] = (this.userCart.items[product.id] || 0) + quantity;

    this.cartSubject.next(this.cart);
    this.saveCartToLocalStorage();
    this.updateUserCartOnServer();
  }

  getCartItems(): { product: ProductWithSpecs; quantity: number }[] {
    return this.cart;
  }

  getUserCart(id: string | null): void {
    if (id) {
      this.http.get<Cart>(`${this.apiUrl}/${id}`).pipe(
        map((cart) => {
          this.userCart = cart;
          this.saveCartToLocalStorage(); // Save cart to local storage
        }),
        catchError(error => {
          console.log('Error fetching cart:', error);
          return throwError(() => new Error('Error fetching cart'));
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
        this.saveCartToLocalStorage(); // Save new cart to local storage
        return cart;
      }),
      catchError(error => {
        console.log('Error initializing cart:', error);
        return throwError(() => new Error('Error initializing cart'));
      })
    );
  }

  getProductQuantity(id: number): number {
    const cartItem = this.userCart.items[id];
    return cartItem !== undefined ? cartItem : 0;
  }

  clearCart(): void {
    this.userCart.items = {};
    this.cart = [];
    this.saveCartToLocalStorage();
    this.updateUserCartOnServer();
  }

  updateUserCartOnServer(): void {
    if (this.userCart.id !== 0) {
      this.http.post<Cart>(this.apiUrl, this.userCart, { headers: this.getHeaders() }).pipe(
        catchError(error => {
          console.log('Error updating cart:', error);
          return throwError(() => new Error('Error updating cart'));
        })
      ).subscribe(
        (response) => console.log('Cart updated successfully', response),
        (error) => console.log('Error updating cart:', error)
      );
    }
  }

  getProductById(id: number): ProductWithSpecs | undefined {
    // Simulate fetching product by ID. Implement according to your data source.
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
    this.saveCartToLocalStorage();
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
      this.cart = this.cart.filter(item => item.product.id !== id);
    }
    this.cartSubject.next(this.cart);
    this.saveCartToLocalStorage();
    this.updateUserCartOnServer();
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  }
}
