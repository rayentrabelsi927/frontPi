import { Component, OnInit } from '@angular/core';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';

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
  constructor(private sportTeamService: SportTeamService) {}

  ngOnInit(): void {}

  addSportTeamCap(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    console.log('Team Name:', this.teamName);
    console.log('Selected File:', this.selectedFile);

    const captainId = 13;
    this.sportTeamService.addSportTeam(this.teamName, captainId, this.selectedFile).subscribe(
      data => {
        console.log('Response:', data);
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
}
