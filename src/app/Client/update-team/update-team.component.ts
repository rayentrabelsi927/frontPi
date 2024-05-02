import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit{
//   userEmail: string = ''; // Initialize user email variable
// sportTeamId: number =0;
//   updatedTeam: any = { nameTeam: '', logoTeam: '' };
//   selectedFile: File | undefined;

//   constructor(
//     private sportTeamService: SportTeamService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.sportTeamId = +params.get('id')!;
//       console.log('Sport Team ID:', this.sportTeamId); // Add this line to check the value
//       // Fetch the sport team details based on the ID
//       this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
//         (data: any) => {
//           this.updatedTeam.nameTeam = data.nameTeam; // Set the existing team name
//           this.updatedTeam.logoTeam = data.logoTeam;
//         },
//         error => {
//           console.error('Error fetching sport team:', error);
//         }
//       );
//     });
//   }

//   onFileChange(event: any): void {
//     // Update the selectedFile property with the newly selected file
//     this.selectedFile = event.target.files[0];
//     console.log('File selected:', this.selectedFile);
//   }

//   updateTeam(): void {
//     console.log('Selected File:', this.selectedFile);
//     if (!this.sportTeamId) {
//       console.error('Invalid sport team ID');
//       return;
//     }
    
//     const updatedTeam = {
//       nameTeam: this.updatedTeam.nameTeam,
//       // Add other properties if needed
//     };
  
//     if (this.selectedFile) { // Add this check
//       this.sportTeamService.updateSportTeamCap(this.sportTeamId, this.updatedTeam.nameTeam, this.updatedTeam, this.selectedFile).subscribe(
//         data => {
//           console.log('Team updated successfully:', data);
//           // this.navigateToAllSportTeamPage();
//         },
//         error => {
//           console.error('Error updating team:', error);
//         }
//       );
//     } else {
//       // Handle the case where no file is selected
//       console.error('No file selected for update');
//     }
//   }
  
  
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
  this.router.navigate(['/allsportteam']);
}


  }
  
  
  
  


