import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-addsport-team',
  templateUrl: './admin-addsport-team.component.html',
  styleUrls: ['./admin-addsport-team.component.css']
})
export class AdminAddsportTeamComponent implements OnInit {
  sportTeam: SportTeamService[] = [];
  errorMessage: any;
  teamName: string = '';
  selectedFile: File | undefined;
  userEmail: string = '';
  constructor(private sportTeamService: SportTeamService, private router: Router,private userTok: TokenService) {}

  ngOnInit(): void {}

  addSportTeamCap(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    console.log('Team Name:', this.teamName);
    console.log('Selected File:', this.selectedFile);

    const captainId = 3;
    this.sportTeamService.addSportTeam(this.teamName, captainId, this.selectedFile).subscribe(
      data => {
        console.log('Response:', data);
        this.navigateToDetailsTeamPage(data.teamId);
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
        this.navigateToDetailsTeamPage(data.teamId);
        
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }

  navigateToDetailsTeamPage(teamId: number): void {
    this.router.navigate(['admin/details-team', teamId]);
  }
}
