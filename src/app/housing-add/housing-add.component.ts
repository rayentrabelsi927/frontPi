import { Component, OnInit } from '@angular/core';
import { Housing } from '../models/housing';
import { User } from '../models/user';
import { HousingService } from '../services/housing.service';
import { Router } from '@angular/router';
import { TypeH } from '../models/TypeH';

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
  currentUser: number = 1;
  //this.currentUser = this.authService.getCurrentUser().id;
  selectedRenters: User[] = [];
  //housing: Housing=new Housing();
  constructor(private housingService: HousingService,private router: Router) { }
  saveHousing() {
    const observer = {
      next: (data: Housing[]) => {
        console.log(data);
        this.gotoHousings();
      },
      error: (error: any) => {
        console.log(error);
      }
    };
  
    this.housingService.addHousing(this.housing).subscribe(observer);
  }
  
  gotoHousings(){
    this.router.navigate(['/housing-list'])

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit(){
    console.log(this.housing);
    this.saveHousing();
    
  }
  


}
