export class User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  role: string;
  imgUser: string;
  lastLogin: string;
  badge: string;
  createdDate: Date;
  lastModifiedDate: Date;
  accountLocked: boolean;
  enabled: boolean;


  constructor(userId: number, username: string, firstName: string, lastName: string, email: string,
    password: string, phone: number, role: string, imgUser: string, lastLogin: string, badge: string, createdDate: Date, lastModifiedDate: Date, accountLocked: boolean, enabled: boolean) {
this.userId = userId;
this.username = username;
this.firstName = firstName;
this.lastName = lastName;
this.email = email;
this.password = password;
this.phone = phone;
this.role = role;
this.imgUser = imgUser;
this.lastLogin = lastLogin;
this.badge = badge;
this.createdDate = createdDate;
this.lastModifiedDate = lastModifiedDate;
this.accountLocked = accountLocked;
this.enabled = enabled;
  
  }
}