import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  user: any;

  constructor(private userService: UserService,private router: Router) {}


  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data:any[])=>{
        this.user=data;
      }
    )
  }

}
