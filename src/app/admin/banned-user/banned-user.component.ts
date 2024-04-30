import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-banned-user',
  templateUrl: './banned-user.component.html',
  styleUrls: ['./banned-user.component.css']
})
export class BannedUserComponent   {
banned:any;

  constructor( private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
this.bannedusers();
  }

  bannedusers(){
    this.feedbackService.getbanneduserList().subscribe(data => {
      this.banned = data;
      console.log(this.banned)


 // Affiche data complet dans la console
    });

  }

  removeban(id:number){
    this.feedbackService.removeban(id).subscribe(data => {
      this.banned = data;
      console.log(this.banned)

this. ngOnInit();
 // Affiche data complet dans la console
    });

  }

}
