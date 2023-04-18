import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAuthServiceInterface } from "../../models/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthServiceInterface{
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.loggedIn.next(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const isLoggedIn = username === 'user' && password === 'password';
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    this.loggedIn.next(isLoggedIn);
    return this.loggedIn.asObservable();
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }

  isLogged(): boolean {
    return this.loggedIn.getValue();
  }
}
