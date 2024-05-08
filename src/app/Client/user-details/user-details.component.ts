import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId!: any;
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getUserById(String(this.userId)).subscribe(
      (data: User) => {
        this.user = data;
        console.log(this.user)
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

}
