// user.model.ts

export class User {
  userId: number;
  role: string;

  constructor(userId: number, role: string) {
    this.userId = userId;
    this.role = role;
  }
}
