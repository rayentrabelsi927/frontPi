import { Housing } from "./Housing";

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
  adresse: string;
  ownedHousing: Housing[];
      rentedHousing: Housing[];

  constructor(userId: number, username: string, firstName: string, lastName: string, email: string,
              password: string, phone: number, role: string, imgUser: string, lastLogin: string, badge: string,ownedHousing: Housing[],
              rentedHousing: Housing[], lastModifiedDate: Date, createdDate: Date, accountLocked: boolean, enabled: boolean, adresse: string) {
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
    this.ownedHousing = ownedHousing;
    this.rentedHousing = rentedHousing;
    this.createdDate = createdDate;
this.lastModifiedDate = lastModifiedDate;
this.accountLocked = accountLocked;
this.enabled = enabled;
this.adresse = adresse;
    
    
  }
  }
