import { Component, OnInit } from '@angular/core';
import { HousingService } from '../services/housing.service';
import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { Housing } from '../models/Housing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-housing-ats',
  templateUrl: './housing-ats.component.html',
  styleUrls: ['./housing-ats.component.css']
})
export class HousingATSComponent  implements OnInit {
  newTimeSlot: AvailabilityTimeSlot = {
    startTime: new Date(),
    endTime: new Date(),
    id: 0,
    housing: new Housing()
  };
  housingId: number = 0; // Initialisation à 0 par défaut

  constructor(private housingService: HousingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Souscrire aux changements des paramètres de l'URL
    this.route.params.subscribe(params => {
      // Récupérer l'id du logement depuis les paramètres de l'URL
      this.housingId = +params['housingId']; // Convertir en nombre
    });
  }

  addTimeSlot(): void {
    this.housingService.addAvailabilityTimeSlotToHousing(this.housingId, this.newTimeSlot)
      .subscribe(
        () => {
          console.log('Time slot added successfully');
          // Traitez la réponse ou les cas d'erreur ici
        },
        error => {
          console.error('Error adding time slot:', error);
          // Gérez l'erreur ici
        }
      );
  }
}
