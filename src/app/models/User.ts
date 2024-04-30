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

  constructor(userId: number, username: string, firstName: string, lastName: string, email: string,
              password: string, phone: number, role: string, imgUser: string, lastLogin: string, badge: string) {
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
  }
  }