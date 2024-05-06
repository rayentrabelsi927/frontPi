import { Component, OnInit } from '@angular/core';
import { Housing } from '../../models/Housing';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.css']
})
export class HousingListComponent implements OnInit{

  housings: Housing[]=[];
  constructor(private housingService: HousingService){ }
  ngOnInit(): void {
    this.getHousings();
  }
  private getHousings(){
    this.housingService.getHousings().subscribe(data => {
      this.housings = data;
    })
  }

}
