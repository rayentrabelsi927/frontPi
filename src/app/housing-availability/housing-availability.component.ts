import { Component, ElementRef, OnInit } from '@angular/core';
import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { HousingService } from '../services/housing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-housing-availability',
  templateUrl: './housing-availability.component.html',
  styleUrls: ['./housing-availability.component.css']
})
export class HousingAvailabilityComponent  implements OnInit {
  id: number = 0;
  ats: AvailabilityTimeSlot[] = [];
 

  constructor(private housingService: HousingService, private elementRef: ElementRef,private Act:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id']
    this.getATSdispo(this.id); // Appel de la méthode avec les parenthèses
  }

  private getATSdispo(id: number) {
    this.housingService.getATSdispo(id).subscribe(
      data => {
        this.ats = data;
      },
      error => {
        console.error('Error fetching ATS:', error);
      }
    );
  }

  navigateToAddTimeSlot(): void {
    this.router.navigate(['housing-ats-add',this.id]);
  }

  
      navigateToAddVisit(idATS:number): void {
        console.info(idATS)
       
        this.router.navigate(['visit-add', idATS,this.id]);
}

}
