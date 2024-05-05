import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { bannedUser } from 'src/app/models/bannedUser';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-banned-user',
  templateUrl: './banned-user.component.html',
  styleUrls: ['./banned-user.component.css']
})
export class BannedUserComponent   {
banned:any;
searchQuery: string = '';
  filteredBannedUsers: any;

  constructor( private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
this.searchTransactionsByUser(this.searchQuery);
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
    });

  }



  searchTransactionsByUser(searchQuery: any) {
    this.feedbackService.getbanneduserList().subscribe(data => {
        this.banned = data;
        console.log(this.banned);
        
        if (!searchQuery || searchQuery.trim() === '') {
            this.filteredBannedUsers = this.banned;
        } else {
            const trimmedQuery = searchQuery.trim().toLowerCase();
            this.filteredBannedUsers = this.banned.filter((user: bannedUser) =>
                user.username.toLowerCase().includes(trimmedQuery) ||
                user.idtransaction.toString().includes(trimmedQuery)
            );
        }
        
        console.log(this.filteredBannedUsers);
    });
}


  
}
