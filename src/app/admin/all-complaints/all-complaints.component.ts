import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ComplaintService } from 'src/app/services/complaint.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  complaints: any[] = [];
  users: User[] = [];
  items: User[] = [];
  pageSize: number = 5; // Change this value based on your requirement
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];
  user!: User;
  userId!: number;


  constructor(private complaintService: ComplaintService,private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.complaintService.getAll().subscribe(
      (data: any[]) => {
        this.complaints = data;
        console.log('complaint',this.complaints)
      },
      error => {
        console.error('Error fetching complaints:', error);
      }
    );
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



  getYesOrNo(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
  

  toggleAccountLock(email: string): void {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      console.error('User not found for email:', email);
      return;
    }
    
    this.userService.updateUserLock(user.userId, user).subscribe(
      updatedUser => { 
        this.complaintService.getAll();
        console.log('User account lock status updated:', updatedUser);
      },
      error => {
        console.error('Error updating user account lock status:', error);
      }
    );
  }
  
}
