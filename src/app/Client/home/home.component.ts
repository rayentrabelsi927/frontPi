import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loggedInUser: any; // Define a variable to store the logged-in user's information

  constructor() {}

  ngOnInit(): void {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token using JwtHelperService
      const jwtHelper = new JwtHelperService();
      try {
        const decodedToken = jwtHelper.decodeToken(token);
        console.log('Decoded token:', decodedToken['user ID']);        
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
}
