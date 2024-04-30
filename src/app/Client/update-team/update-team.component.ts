import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit{
  userEmail: string = ''; // Initialize user email variable
sportTeamId: number =0;
  updatedTeam: any = { nameTeam: '', logoTeam: '' };
  selectedFile: File | undefined;

  constructor(
    private sportTeamService: SportTeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sportTeamId = +params.get('id')!;
      console.log('Sport Team ID:', this.sportTeamId); // Add this line to check the value
      // Fetch the sport team details based on the ID
      this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
        (data: any) => {
          this.updatedTeam.nameTeam = data.nameTeam; // Set the existing team name
          this.updatedTeam.logoTeam = data.logoTeam;
        },
        error => {
          console.error('Error fetching sport team:', error);
        }
      );
    });
  }

  onFileChange(event: any): void {
    // Update the selectedFile property with the newly selected file
    this.selectedFile = event.target.files[0];
    console.log('File selected:', this.selectedFile);
  }

  updateTeam(): void {
    console.log('Selected File:', this.selectedFile);
    if (!this.sportTeamId) {
      console.error('Invalid sport team ID');
      return;
    }
    
    const captainId = 13; // or get it from wherever it should come from
    const nameTeam = this.updatedTeam.nameTeam; // Get the nameTeam from the updatedTeam object
  
    this.sportTeamService.updateSportTeamCap(this.sportTeamId, captainId, nameTeam, this.updatedTeam).subscribe(
      data => {
        console.log('Team updated successfully:', data);
        // Optionally, you can perform additional actions after updating the team
      },
      error => {
        console.error('Error updating team:', error);
      }
    );
  }
  


  }
  
  
  
  


