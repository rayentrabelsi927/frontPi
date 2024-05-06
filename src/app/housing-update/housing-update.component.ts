import { Component, OnInit } from '@angular/core';
import { Housing } from '../models/Housing';
import { HousingService } from '../services/housing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TypeH } from '../models/TypeH';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-housing-update',
  templateUrl: './housing-update.component.html',
  styleUrls: ['./housing-update.component.css']
})
export class HousingUpdateComponent implements OnInit{
  housing: Housing = { 
    housingID: 0, // Assurez-vous d'importer le modèle Housing
    typeHousing:TypeH.Shared,     // Initialisation avec une chaîne vide
    descriptionHousing: '',
    locationHousing: '',
    availabilityHousing: true,
    priceHousing: 0
  };
  Files: File[] = [];

  id!:number;
  
  subscription: Subscription= new Subscription();
  
  constructor(private hs:HousingService,private router:Router,private Act:ActivatedRoute) { }
 


ngOnInit(){
  //2- récuperation de l'id depuis l'url
  this.id=this.Act.snapshot.params['id']
  //3- recuperation de produit lui  meme
  this.hs.getHousingById(this.id).subscribe({
     next: data => {
      console.log('Housing updated successfully:', data);
      // Réinitialiser les données du formulaire ou effectuer d'autres actions nécessaires
    },
    error: error => {
      console.error('Error updating housing:', error);
      // Gérer l'erreur d'ajout de logement
    }
  }
  )

}

save (){
//5-la mise à jour
this.hs.updateHousing(this.housing,this.id).subscribe(
  {
    next:()=>this.router.navigateByUrl('admin/housing-Owner/1'),
    complete:()=>console.log('done')
  }
)
}


}
