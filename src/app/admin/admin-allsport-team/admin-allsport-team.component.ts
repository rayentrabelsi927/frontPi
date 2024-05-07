import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-allsport-team',
  templateUrl: './admin-allsport-team.component.html',
  styleUrls: ['./admin-allsport-team.component.css']
})
export class AdminAllsportTeamComponent implements OnInit{
 // sportTeam:SportTeam[]=[];
 errorMessage: any;
 valeurInput: string = '';
 sportTeam:any[]=[];

 currentPage: number = 1;
  itemsPerPage: number = 3;

 constructor(private sportTeamService: SportTeamService,private router: Router,private userTok: TokenService) { }

 ngOnInit(): void {
   this.getAllSportTeam();
  

 }

 get pages(): number[] {
  const totalPages = Math.ceil(this.sportTeam.length / this.itemsPerPage);
  return Array(totalPages).fill(0).map((_, index) => index + 1);
}


 getAllSportTeam(): void {
   this.sportTeamService.getAll().subscribe(
     (data:any[])=>{
       this.sportTeam=data;
     }
   )
 }



 navigateToAddTeam(): void {
   this.router.navigate(['admin/add-team']);
 }

 navigateToUpdateTeamPage(teamId: number): void {
   this.router.navigate(['admin/update-team', teamId]);
 }
 
 navigateToDetailsTeamPage(teamId: number): void {
   this.router.navigate(['admin/details-team', teamId]);
 }
 
 deleteSportTeam(sportTeamId: number): void {
  this.sportTeamService.deleteSportTeam(sportTeamId).subscribe(
    () => {
      console.log('Sport team deleted successfully.');
      this.getAllSportTeam()
    },
    (error) => {
      console.error('Error deleting sport team:', error);
    }
  );
}

}
