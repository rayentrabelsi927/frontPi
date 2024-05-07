import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];
  items: User[] = [];
  pageSize: number = 5; // Change this value based on your requirement
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];
  user!: User;
  userId!: number;

  constructor(private userService: UserService, private router: Router) {}

  
  
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        this.changePage(this.currentPage);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  paginate(array: User[], pageSize: number, pageNumber: number): User[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.items = this.paginate(this.users, this.pageSize, this.currentPage);
  }

  navigateToUpdate(user: User) {
    // Navigate to update page with user ID or any other necessary data
  }

  getYesOrNo(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

  toggleEnabled(user: User): void {
    user.enabled = !user.enabled;
    this.userService.updateUser(user.userId, user).subscribe(
      updatedUser => {
        // Optionally handle the response or perform any additional actions
        console.log('User enabled status updated:', updatedUser);
      },
      error => {
        console.error('Error updating user enabled status:', error);
        // Optionally handle the error
      }
    );
  }

  // toggleAccountLock(): void {
  //   this.userService.updateUser(this.userId, this.user).subscribe(
  //     response => {
  //       console.log('User updated successfully:', response);
  //       // Redirect to the all-fields component after successful update
  //       // You can implement this similar to the AddFieldComponent
  //       this.router.navigate(['/admin/all-users']);
  //     },
  //     error => {
  //       console.error('Error updating user:', error);
  //     }
  //   );
  // }

  toggleAccountLock(user: User): void {
    user.accountLocked = !user.accountLocked;
    this.userService.updateUser(user.userId, user).subscribe(
      updatedUser => {
        // Optionally handle the response or perform any additional actions
        console.log('User account lock status updated:', updatedUser);
      },
      error => {
        console.error('Error updating user account lock status:', error);
        // Optionally handle the error
      }
    );
  }


}
