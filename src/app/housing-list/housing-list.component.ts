import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { Housing } from '../models/Housing';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})
export class HousingListComponent implements OnInit, AfterViewInit{
  isSidebarExpanded: boolean = true;
  userId:any;
  housings: any[]=[];
  constructor(private housingService: HousingService, private elementRef: ElementRef, private router: Router, private token : TokenService){ }
  ngOnInit(): void {

    this.userId=this.token.currentUser();
    this.getHousings();
  }
  private getHousings(){
    this.housingService.getHousings().subscribe(data => {
      this.housings = data;
    })
  }


  navigateowner(): void {
    this.router.navigate(['admin/housing-Owner/', this.userId]);
  }

  

  delete(id:number){
    this.housingService.deleteHousing(id).subscribe(
      ()=>this.ngOnInit()
    )
  }
  update(id:number,housing:Housing){
    this.housingService.updateHousing(housing,id).subscribe(
      ()=>this.ngOnInit()
    )
  }
  generateRandomColor(type: string): string {
    // Définir les valeurs RGB pour les couleurs vert et bleu
    let r, g, b;
    if (type === 'Shared') {
        // Vert
        r = 0;
        g = 128;
        b = 0;
    } else if(type === 'SinglePerson'){
        // Bleu
        r = 0;
        g = 0;
        b = 255;
    }
  
    // Créer une couleur hexadécimale à partir des valeurs RGB
    const color = `rgb(${r},${g},${b})`;
    return color;
}
ngAfterViewInit(): void {
  const hamBurger = this.elementRef.nativeElement.querySelector('.toggle-btn');

  if (hamBurger) {
    hamBurger.addEventListener('click', () => {
      const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');
      sidebar.classList.toggle('expand');
    });
  }
}






}
