import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() { }

  login() {
    // Perform login actions here, such as validating credentials
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout actions here
    this.isLoggedIn = false;
  }
}

