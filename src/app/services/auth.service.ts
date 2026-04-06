import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor() {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue && !!this.getToken();
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // Mock authentication - replace with actual API call
    return of(this.mockLogin(loginRequest)).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        this.storeUserData(response.user, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private mockLogin(loginRequest: LoginRequest): LoginResponse {
    // Mock validation - replace with actual authentication logic
    if (loginRequest.username === 'admin' && loginRequest.password === 'password') {
      const user: User = {
        id: '1',
        username: 'admin',
        email: 'admin@example.com'
      };
      return {
        user,
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    throw new Error('Invalid credentials');
  }

  private storeUserData(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
