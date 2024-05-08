import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { Roles } from 'src/app/services/models/registration-request';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstName: '', lastName: '', password: '', username:'', role: Roles.Student, imgUser: '', phone: 0, adresse:''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  roles: string[] = Object.values(Roles);

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}