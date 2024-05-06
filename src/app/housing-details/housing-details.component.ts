import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.css']
})
export class HousingDetailsComponent implements OnInit {
  housingId!: number;
  id!: number;
  housing: any; // Changer le type de housing en 'any' pour l'instant
  searchValue: string = '';
  mapUrl: SafeResourceUrl = '';

  availabilityTimeSlots: any[] = []; // Ajoutez la propriété availabilityTimeSlots

  constructor(
    private Act: ActivatedRoute,
    private housingService: HousingService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient // Injectez le service HttpClient
  ) {}

  ngOnInit() {
    this.id = this.Act.snapshot.params['id'];
    this.loadHousingDetails();
    // this.loadAvailabilityTimeSlots(); // Appelez la méthode pour charger les créneaux horaires disponibles
  }

 

  navigateToListTimeSlot(): void {
    this.router.navigate(['housing-ats-list', this.id]);
  }
  navigateToListVisit(): void {
    this.router.navigate(['housing-visit-list', this.id]);
  }
  updateMapUrl(location: string) {
    const encodedValue = encodeURIComponent(location.trim());
    const url = `https://maps.google.com/maps?q=${encodedValue}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loadHousingDetails() {
    const housingId: number = this.Act.snapshot.params['id'];

    if (!isNaN(housingId)) {
      this.housingService.getHousingById(housingId).subscribe((data: any) => {
        this.housing = data;
        this.updateMapUrl(this.housing.locationHousing);
      });
    } else {
      console.error("Invalid housing ID");
    }
  }

 
}
