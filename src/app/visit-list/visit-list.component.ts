import { Component, OnInit } from '@angular/core';
import { HousingService } from '../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { Visit } from '../models/visit';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {
  id: number = 0;
  visits: Visit []= [];
  constructor(private housingService: HousingService,private Act:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id']
    this.getVisits(this.id); // Appel de la méthode avec les parenthèses
  }
  

  private getVisits(id: number) {
    this.housingService.getVisits(id).subscribe(
      data => {
        this.visits = data;
      },
      error => {
        console.error('Error fetching VISIT:', error);
      }
    );
  }

}
