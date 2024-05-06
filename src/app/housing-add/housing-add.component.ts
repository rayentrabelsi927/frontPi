import { Component, OnInit } from '@angular/core';
import { Housing } from '../models/Housing';
import { User } from '../models/User';
import { HousingService } from '../services/housing.service';
import { Router } from '@angular/router';
import { TypeH } from '../models/TypeH';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-housing-add',
  templateUrl: './housing-add.component.html',
  styleUrls: ['./housing-add.component.css']
})
export class HousingAddComponent implements OnInit{
  housing: Housing = { 
    housingID: 0, // Assurez-vous d'importer le modèle Housing
    typeHousing:TypeH.Shared,     // Initialisation avec une chaîne vide
    descriptionHousing: '',
    locationHousing: '',
    availabilityHousing: true,
    priceHousing: 0
  };
  
  previewImageUrl: string | ArrayBuffer;
  currentUser: number = 1;
  selectedFiles: File[] = [];
  subscription: Subscription= new Subscription();
  //this.currentUser = this.authService.getCurrentUser().id;
  selectedRenters: User[] = [];
  //housing: Housing=new Housing();
  constructor(private housingService: HousingService,private router: Router) { 
    this.previewImageUrl = '';
    
  }
  // saveHousing() {
  //   const observer = {
  //     next: (data: Housing[]) => {
  //       console.log(data);
  //       this.gotoHousings();
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   };
  
  //   this.housingService.addHousing(this.housing).subscribe(observer);
  // }

  saveHousing(): void {
    this.subscription = this.housingService.addHousingWithImages(
      this.housing.typeHousing,
      this.housing.descriptionHousing,
      this.housing.locationHousing,
      this.housing.availabilityHousing,
      this.housing.priceHousing,
      this.selectedFiles
    ).subscribe({
      next: data => {
        this.router.navigateByUrl('/housing-list'),
        console.log('Housing added successfully:', data);
        // Réinitialiser les données du formulaire ou effectuer d'autres actions nécessaires
      },
      
      error: error => {
        console.error('Error adding housing:', error);
        // Gérer l'erreur d'ajout de logement
      }
    });
  }
  

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  




  gotoHousings(){
    this.router.navigate(['/housing-list'])

  }
  ngOnInit(): void {
    console.log('Le composant HousingAddComponent a été initialisé.');
  }
  onSubmit(){
    console.log(this.housing);
    this.saveHousing();
    
  }
 

  


}
