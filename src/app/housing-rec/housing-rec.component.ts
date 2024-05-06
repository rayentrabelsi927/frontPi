import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { HousingService } from '../services/housing.service';
import { Housing } from '../models/housing';

@Component({
  selector: 'app-housing-rec',
  templateUrl: './housing-rec.component.html',
  styleUrls: ['./housing-rec.component.css']
})
export class HousingRecComponent implements OnInit, AfterViewInit{
  isSidebarExpanded: boolean = true;

  housings: Housing[]=[];
  constructor(private housingService: HousingService, private elementRef: ElementRef){ }
  ngOnInit(): void {
    this.recHousings();
  }
  private recHousings(){
    this.housingService.recHousing().subscribe(data => {
      this.housings = data;
    })
  }

  

  delete(id:number){
    this.housingService.deleteHousing(id).subscribe(
      ()=>this.ngOnInit()
    )
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
