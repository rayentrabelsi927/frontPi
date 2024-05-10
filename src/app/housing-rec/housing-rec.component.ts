import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { HousingService } from '../services/housing.service';
import { Housing } from '../models/Housing';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-housing-rec',
  templateUrl: './housing-rec.component.html',
  styleUrls: ['./housing-rec.component.css']
})
export class HousingRecComponent implements OnInit, AfterViewInit {
  isSidebarExpanded: boolean = true;
  housings: any[] = [];
  currentUser: any;

  constructor(private housingService: HousingService, private elementRef: ElementRef, private userToken: TokenService) { }

  ngOnInit(): void {
    this.currentUser = this.userToken.currentUser();
    if (this.currentUser) {
      this.housingService.getAddress(this.currentUser).subscribe(
        (userAddress: string) => {
          // Utilisez l'adresse récupérée ici
          this.recHousings(userAddress);
          console.log('user', this.currentUser);
          console.log('adresse', userAddress);
        },
        (error: any) => {
          console.error('Error fetching user address:', error);
        }
      );
    }
  }
  
  

  recHousings(address: string) {
    this.housingService.recHousing(address).subscribe(data => {
      this.housings = data;
    });
  }

  delete(id: number) {
    this.housingService.deleteHousing(id).subscribe(
      () => this.ngOnInit()
    );
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
