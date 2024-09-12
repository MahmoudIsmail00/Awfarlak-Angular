import { WishList } from './../../../Models/wishlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../../Models/user';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/account`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          response.WishList =
            response.WishList ||
            ({ data: [] } as WishList);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return true;
        }),
        catchError(this.handleError<boolean>('login'))
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
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
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return true;
      }),
      catchError(this.handleError<boolean>('signup'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(
        () => new Error(`${operation} failed: ${error.message}`)
      );
    };
  }
}
