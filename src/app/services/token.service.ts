import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token') as string;
  }

  // currentUser(): number | nul {
  //   // Retrieve token from local storage
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // Decode token using JwtHelperService
  //     const jwtHelper = new JwtHelperService();
  //     try {
  //       const decodedToken = jwtHelper.decodeToken(token);
  //       const userId = parseInt(decodedToken['user ID'], 10);
  //       return userId;
  //       console.log('Decoded token:', decodedToken['user ID']);        
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //     }
  //   }
  // }

  currentUser(): number | null {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token using JwtHelperService
      const jwtHelper = new JwtHelperService();
      try {
        const decodedToken = jwtHelper.decodeToken(token);
        console.log('Decoded token:', decodedToken);
        // Assuming the numerical value is stored under 'user ID'
        const userId = parseInt(decodedToken['user ID'], 10);
        return userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
}


currentUserrole(): any {
  // Retrieve token from local storage
  const token = localStorage.getItem('token');
  if (token) {
    // Decode token using JwtHelperService
    const jwtHelper = new JwtHelperService();
    try {
      const decodedToken = jwtHelper.decodeToken(token);
      console.log('Decoded token:', decodedToken);
      // Assuming the numerical value is stored under 'user ID'
      const userId = parseInt(decodedToken['user ID'], 10);
      return decodedToken['authorities'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
}

}
