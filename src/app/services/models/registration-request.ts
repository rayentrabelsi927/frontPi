/* tslint:disable */

import { ResolveStart } from "@angular/router";

/* eslint-disable */
export interface RegistrationRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  phone: number;
  imgUser: string;
  role: Roles;
  adresse: string;

}


export enum Roles {
  Student = 'student',
  Admin = 'admin',
  Other = 'other'
}
