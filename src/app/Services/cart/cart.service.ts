import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from '../../../Models/cart';
import { environment } from '../environment';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = `${environment.apiUrl}/basket/`; // Updated to match API endpoint
  userCart: Cart = { id: 'unRegisteredUserCartId', items: {} };
  private cart: { product: ProductWithSpecs; quantity: number }[] = []; // Updated type

  constructor(private http: HttpClient) {}

  addToCart(product: ProductWithSpecs, quantity: number): void {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    console.log('Product added to cart:', product);
  }
  getCartProducts(): { product: ProductWithSpecs; quantity: number }[] {
    return this.cart;
  }

  getCartItems(): { product: ProductWithSpecs; quantity: number }[] {
    return this.cart;
  }

  // Fetch the user cart from the server using basket ID
  getUserCart(id: string | null): void {
    if (id) {
      this.http
        .get<Cart>(`${this.apiUrl}/${id}`)
        .pipe(
          map((cart) => {
            this.userCart = cart;
          })
        )
        .subscribe(
          (cart) => console.log('Fetched user cart:', cart),
          (error) => console.log('Error fetching cart:', error)
        );
    } else {
      console.log('User is not registered, no cart ID provided');
    }
  }

  // Initialize a new empty cart for a new user or guest
  initializeCart(): Observable<Cart> {
    const newCart = { id: this.userCart.id, items: {} }; // Keep the ID if it's already set
    return this.http.post<Cart>(this.apiUrl, newCart).pipe(
      map((cart) => {
        this.userCart = cart;
        return cart;
      })
    );
  }

  // Get the quantity of a specific product from the cart
  getProductQuantity(id: string): number {
    const cartItem = this.userCart.items[id];
    return cartItem !== undefined ? cartItem : 0;
  }

  // Clear the cart (removes all items but keeps the basket ID)
  clearCart(): void {
    this.userCart.items = {}; // Reset cart items
    this.updateUserCartOnServer(); // Save changes to the server
  }

  // Update the cart on the server using the POST method
  updateUserCartOnServer(): void {
    if (this.userCart.id !== 'unRegisteredUserCartId') {
      this.http
        .post<Cart>(this.apiUrl, this.userCart) // Using POST to update (as per WebAPI)
        .subscribe(
          (response) => console.log('Cart updated successfully', response),
          (error) => console.log('Error updating cart:', error)
        );
    }
  }

  // Increase the quantity of a product in the cart
  increaseProductQuantity(id: string): void {
    if (this.userCart.items[id]) {
      this.userCart.items[id] += 1;
    } else {
      this.userCart.items[id] = 1;
    }
    this.updateUserCartOnServer(); // Update the cart on the server after the change
  }

  // Decrease the quantity of a product in the cart
  decreaseProductQuantity(id: string): void {
    if (this.userCart.items[id] && this.userCart.items[id] > 1) {
      this.userCart.items[id] -= 1;
    } else {
      delete this.userCart.items[id]; // Remove the product if quantity is zero
    }
    this.updateUserCartOnServer(); // Update the cart on the server after the change
  }

  // Calculate the total price of the cart
  calculateTotal(): number {
    return this.cart.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  }
}
