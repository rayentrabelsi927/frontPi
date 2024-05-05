import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-admin-updatesport-team',
  templateUrl: './admin-updatesport-team.component.html',
  styleUrls: ['./admin-updatesport-team.component.css']
})
export class AdminUpdatesportTeamComponent implements OnInit {

userEmail: string = ''; 
sportTeamId: number | null = null; 
updatedTeam: any = { nameTeam: '', logoTeam: '' };
selectedFile: File | undefined;

constructor(
  private sportTeamService: SportTeamService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id !== null) {
      this.sportTeamId = +id;
      console.log('Sport Team ID:', this.sportTeamId); 
      // Fetch the sport team details based on the ID
      this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
        (data: any) => {
          this.updatedTeam.nameTeam = data.nameTeam; 
          this.updatedTeam.logoTeam = data.logoTeam;
        },
        error => {
          console.error('Error fetching sport team:', error);
        }
      );
    } else {
      console.error('Sport team ID is null');
    }
  });
}


onFileChange(event: any): void {
  this.selectedFile = event.target.files[0];
  console.log('File selected:', this.selectedFile);
}
updateTeam(): void {
  console.log('Selected File:', this.selectedFile);
  if (!this.sportTeamId) {
    console.error('Invalid sport team ID');
    return;
  }
  
  const updatedTeam = {
    nameTeam: this.updatedTeam.nameTeam,
  };

  if (this.selectedFile) { 
    this.sportTeamService.updateSportTeamCap(this.sportTeamId, this.updatedTeam.nameTeam, this.updatedTeam, this.selectedFile).subscribe(
      data => {
        console.log('Team updated successfully:', data);
        this.navigateToAllSportTeamPage();
      },
      error => {
        console.error('Error updating team:', error);
      }
    );
  } else {
    console.error('No file selected for update');
  }
}


navigateToAllSportTeamPage(): void {
  this.router.navigate(['admin/allsportteam']);
}
  
}
