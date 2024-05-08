import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { Housing } from '../models/Housing';
import { HousingService } from '../services/housing.service';
import { Visit } from '../models/visit';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {
   visit: Visit = {
    visiteID:0,
    description:"",
    startDateTime: new Date(),
    endDateTime: new Date()
  };
  showpopup: boolean=false;
 
  housingId!:any; // Initialisation à 0 par défaut
  idATS!: any;


  constructor(private housingService: HousingService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const housingIdParam = params.get('housingId');
      const idATSParam = params.get('idATS');
  
      // Vérifier si les paramètres sont définis et non null
      if (housingIdParam !== null && idATSParam !== null) {
        // Convertir les valeurs en numérique si nécessaire
        this.housingId = +housingIdParam;
        this.idATS = +idATSParam;
      }
    });
  }
      
    

  submitVisit(): void {
    this.housingService.addVisit(this.housingId, this.idATS)
      .subscribe(
        () => {
          console.log('Visit added successfully');
          this.showpopup=true;
          // Traitez la réponse ou les cas d'erreur ici
        },
        error => {
          console.error('Error adding visit:', error);
          // Gérez l'erreur ici
        }
      );
      
  }

  closepopup():void{
    this.showpopup=false;
  }
}


