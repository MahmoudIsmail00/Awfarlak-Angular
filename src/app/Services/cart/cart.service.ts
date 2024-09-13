import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { BasketItemDto, CustomerBasketDto } from '../../../Models/customerBasket';
import { environment } from '../environment';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { ProductsService } from '../store/products.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = `${environment.apiUrl}/basket/`;
  userCart: CustomerBasketDto = {
    id: '',
    basketItems: [],
    deliveryMethodId: 0,
    shippingPrice: 0,
    paymentIntentId: '',
    clientSecret: ''
  };

  private cartSubject = new BehaviorSubject<BasketItemDto[]>(this.userCart.basketItems);
  isCartCleared = new BehaviorSubject<boolean>(false);

  cart$ = this.cartSubject.asObservable();
  isCartCleared$ = this.isCartCleared.asObservable();

  constructor(private http: HttpClient, private productService: ProductsService) {
    this.initializeCartFromLocalStorage();
  }

  private getToken(): string | null {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const parsedToken = JSON.parse(token);
      return parsedToken.token;
    }
    return null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.userCart));
    localStorage.setItem('isCartCleared', JSON.stringify(this.isCartCleared.value));
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    const isCartCleared = localStorage.getItem('isCartCleared');
    if (cart) {
      try {
        this.userCart = JSON.parse(cart);
        this.cartSubject.next(this.userCart.basketItems);
      } catch (error) {
        console.error('Error loading cart from local storage:', error);
      }
    }
    if (isCartCleared) {
      this.isCartCleared.next(JSON.parse(isCartCleared));
    }
  }

  private initializeCartFromLocalStorage() {
    this.loadCartFromLocalStorage();
  }


  addToCart(product: ProductWithSpecs, quantity: number): void {
    // debugger;
    if (!this.userCart.id) {
      this.userCart.id = uuidv4();
    }

    const existingProductIndex = this.userCart.basketItems.findIndex(item => item.Id === product.id);
    if (existingProductIndex >= 0) {
      this.userCart.basketItems[existingProductIndex].Quantity += quantity;
    } else {
      const newItem: BasketItemDto = {
        Id: product.id,
        ProductName: product.name,
        Price: product.price,
        Quantity: quantity,
        PictureUrl: product.pictureUrl,
        brand: product.productBrandName,
        type: "laptop",
      };
      this.userCart.basketItems.push(newItem);
    }

    this.cartSubject.next(this.userCart.basketItems);
    this.isCartCleared.next(false);
    this.saveCartToLocalStorage();
    this.updateUserCartOnServer();
  }

  updateUserCartOnServer(): void {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = this.getHeaders();
    console.log('Sending request with headers:', headers);
    console.log('Payload:', this.userCart);

    this.http.post<CustomerBasketDto>(this.apiUrl + 'updateBasket', this.userCart, { headers }).pipe(
      catchError(error => {
        console.log('Error updating cart:', error);
        return throwError(() => new Error('Error updating cart'));
      })
    ).subscribe(
      response => console.log('Cart updated successfully', response),
      error => console.log('Error updating cart:', error)
    );
  }



  clearCart(): void {
    const token = this.getToken();
    if (token && this.userCart.id) {
      const headers = this.getHeaders();
      this.http.delete(`${this.apiUrl}DeleteBasketById?id=${this.userCart.id}`, { headers })
        .pipe(
          catchError(error => {
            console.log('Error clearing cart:', error);
            return throwError(() => new Error('Error clearing cart'));
          })
        ).subscribe(() => {

          this.userCart.basketItems = [];
          this.cartSubject.next(this.userCart.basketItems);
          this.isCartCleared.next(true);

          
          localStorage.removeItem('cart');
          localStorage.removeItem('isCartCleared');
        });
    } else {
      console.error('No token or cart ID found');
    }
  }


  increaseProductQuantity(id: number): void {
    const item = this.userCart.basketItems.find(item => item.Id === id);
    if (item) {
      item.Quantity += 1;
      this.cartSubject.next(this.userCart.basketItems);
      this.isCartCleared.next(false);
      this.saveCartToLocalStorage();
      this.updateUserCartOnServer();
    }
  }

  decreaseProductQuantity(id: number): void {
    const item = this.userCart.basketItems.find(item => item.Id === id);
    if (item) {
      if (item.Quantity > 1) {
        item.Quantity -= 1;
      } else {
        this.userCart.basketItems = this.userCart.basketItems.filter(item => item.Id !== id);
      }
      this.cartSubject.next(this.userCart.basketItems);
      this.isCartCleared.next(this.userCart.basketItems.length === 0);
      this.saveCartToLocalStorage();
      this.updateUserCartOnServer();
    }
  }

  calculateTotal(): number {
    return this.userCart.basketItems.reduce((total, item) => total + (item.Price * item.Quantity), 0);
  }
}
