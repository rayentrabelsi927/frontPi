import { Housing } from "./housing";

export class User {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    imgUser: string;
    ownedHousing: Housing[]; // Liste des logements possédés
    rentedHousing: Housing[]; // Liste des logements loués
  
    constructor(
      userId: number,
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      imgUser: string,
      ownedHousing: Housing[],
      rentedHousing: Housing[]
    ) {
      this.userId = userId;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.imgUser = imgUser;
      this.ownedHousing = ownedHousing;
      this.rentedHousing = rentedHousing;
    }
}
