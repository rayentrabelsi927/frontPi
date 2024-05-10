import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Housing } from 'src/app/models/Housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing-owner',
  templateUrl: './housing-owner.component.html',
  styleUrls: ['./housing-owner.component.css']
})
export class HousingOwnerComponent implements OnInit, AfterViewInit{
 
  isSidebarExpanded: boolean = true;
  id: number = 0;
  housings: any[]=[];
  housing !:Housing;
  
 

 
  
  constructor(private housingService: HousingService, private elementRef: ElementRef,private Act:ActivatedRoute,private router: Router){ }
  ngOnInit(): void {
    this.id=this.Act.snapshot.params['id']
    this.getHousingsOwner(this.id);
  }
  private getHousingsOwner(id:number){
    this.housingService.getHousingsOwner(id).subscribe(data => {
      this.housings = data;
    })
  }


 
  redirectToHousingDetail(id:number){
    this.housingService.getHousingById(id).subscribe(data => {
      this.housing = data;})

  }
  navigateToHousingDetail(id:number): void {
    this.router.navigate(['admin/housing-Owner-details', id]);
  }
  navigateToHousingUpdate(id:number): void {
    this.router.navigate(['admin/housing-update/', id]);
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



