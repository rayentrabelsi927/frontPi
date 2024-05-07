import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  userId!:any;
  sportTeam: SportTeam[] = [];
  errorMessage: any;
  teamName: string = '';
  selectedFile: File | undefined;
  userEmail: string = '';
  constructor(private sportTeamService: SportTeamService,private userTok: TokenService,private router: Router) {}

  ngOnInit(): void { this.userId = this.userTok.currentUser();}

  addSportTeamCap(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    console.log('Team Name:', this.teamName);
    console.log('Selected File:', this.selectedFile);

    const captainId = this.userId;
    this.sportTeamService.addSportTeam(this.teamName, captainId, this.selectedFile).subscribe(
      data => {
        console.log('Response:', data);
        this.navigateToAllSportTeamPage();
      },
      err => {
        console.error('Error:', err);
      }
    );
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('File selected:', this.selectedFile);
  }

  addUserToTeam(sportTeamId: number, userId: number): void {
    this.sportTeamService.addUserToSportTeam(sportTeamId, userId).subscribe(
      data => {
        console.log('User added successfully:', data);
        
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }
  
  navigateToAllSportTeamPage(): void {
    this.router.navigate(['/allsportteam']);
  }
  
  
}