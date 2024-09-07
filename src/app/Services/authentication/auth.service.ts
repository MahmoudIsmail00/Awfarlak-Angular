import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, map, Observable } from 'rxjs';
import { User } from '../../Models/user';
import { CartService } from '../cart/cart.service';
import { Cart } from '../../Models/cart';


@Injectable()
export class AuthService {
  apiUrl = 'http://localhost:3000/users';

  isLoggedIn = false;

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            this.isLoggedIn = true;
            const user = users[0];
            const userCartId = user.cartId;
            this.cartService.getUserCart(userCartId!);

            return true;
          } else {
            this.isLoggedIn = false;
            return false;
          }
        })
      );
  }

  logout() {
    this.isLoggedIn = false;
  }
  signup(
    email: string,
    username: string,
    password: string
  ): Observable<boolean> {
    const body: User = { email, username, password };
    return this.cartService.initializeCart().pipe(
      concatMap((cart: Cart) => {
        console.log('the new generated cart is ::', cart);
        body.cartId = cart.id;
        console.log('the new body is ::', body);
        return this.http.post<User>(this.apiUrl, body);
      }),
      map((user) => {
        if (user) {
          console.log('the new registered user is ', user);
          this.isLoggedIn = true;
          this.cartService.getUserCart(user.cartId!);
          return true;
        } else {
          this.isLoggedIn = false;
          return false;
        }
      })
    );
  }

  constructor(private http: HttpClient, private cartService: CartService) {}
}
