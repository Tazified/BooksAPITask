import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:2525/api/auth';

  constructor(private http: HttpClient) {}

  /* ---------- Register ---------- */
  register(payload: AuthRequest): Observable<string> {
    return this.http.post(this.API + '/register', payload, { responseType: 'text' });
  }

  /* ---------- Login (stores JWT) ---------- */
  login(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API + '/login', payload).pipe(
      tap(res => localStorage.setItem('jwt', res.token))
    );
  }

  /* ---------- Helpers ---------- */
  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}