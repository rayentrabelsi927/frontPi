import { Component } from '@angular/core';
import { AuthService } from 'src/app/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  
{
   constructor(private authService: AuthService) {}

login() {
  // Perform login actions, then call the login method from AuthService
  this.authService.login();
}
}

