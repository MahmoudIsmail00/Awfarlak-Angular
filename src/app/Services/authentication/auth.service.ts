import { CompareList } from './../../../Models/comparelist';
import { WishList } from './../../../Models/wishlist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../../Models/user';
import { environment } from '../environment';
import { AddressDto } from '../../../Models/order';
import { ShippingAddressComponent } from '../../shipping-address/shipping-address.component';
import { ShippingAddress } from '../../../Models/shippingaddress';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/account`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser?.token || null;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response) => {
        response.WishList = response.WishList || ({ data: [] } as WishList);
        response.CompareList = response.CompareList || ({ data: [] } as CompareList);


        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);

        this.getCurrentUserAddress().subscribe(address => {
          if (address) {
            const updatedUser: User = {
              ...response,
              address: address
            };
            this.updateCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          }
        });

        return true;
      }),
      catchError(this.handleError<boolean>('login'))
    );
  }



  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    localStorage.removeItem('isCartCleared');
    this.currentUserSubject.next(null);
  }

  signup(
    email: string,
    displayName: string,
    password: string
  ): Observable<boolean> {
    const newUser = { email, displayName, password };
    return this.http.post<any>(`${this.apiUrl}/register`, newUser).pipe(
      map((response) => {
        response.WishList = response.WishList || ({ data: [] } as WishList);
        response.CompareList =
          response.CompareList || ({ data: [] } as CompareList);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return true;
      }),
      catchError(this.handleError<boolean>('signup'))
    );
  }

  getCurrentUserAddress(): Observable<AddressDto> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.get<AddressDto>(`${this.apiUrl}/getaddress`, { headers }).pipe(
      map(address => {
        console.log('Fetched Address:', address);
        return address;
      }),
      catchError(error => {
        console.error('Error fetching address:', error);
        return throwError(() => new Error('Error fetching address'));
      })
    );
  }


  getUserEmail(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.email : null;
  }

  getUserAddress(): AddressDto | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.address : null;
  }

  updateUserAddress(address: AddressDto): Observable<void> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
    return this.http.put<void>(`${this.apiUrl}/updateAddress`, address, { headers }).pipe(
      catchError(this.handleError<void>('updateUserAddress'))
    );
  }


  updateCurrentUser(updatedUser: User): void {
    this.currentUserSubject.next(updatedUser);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
