import { Component, ElementRef, OnInit } from '@angular/core';
import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { HousingService } from '../services/housing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ats-list',
  templateUrl: './ats-list.component.html',
  styleUrls: ['./ats-list.component.css']
})
export class AtsListComponent implements OnInit {
  id: number = 0;
  ats: AvailabilityTimeSlot[] = [];
 

  constructor(private housingService: HousingService, private elementRef: ElementRef,private Act:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id']
    this.getATS(this.id); // Appel de la méthode avec les parenthèses
  }

  private getATS(id: number) {
    this.housingService.getATS(id).subscribe(
      data => {
        this.ats = data;
      },
      error => {
        console.error('Error fetching ATS:', error);
      }
    );
  }
  navigateToAddTimeSlot(): void {
    this.router.navigate(['housing-ats-add', this.id]);
  }
  
}
