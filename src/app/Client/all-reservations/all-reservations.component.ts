import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {

  reservations: any[] = [];

  constructor(private reservationService: ReservationService,private router: Router) {}
  
  ngOnInit(): void {
    this.fetchAllReservations();
  }

  fetchAllReservations(): void {
    this.reservationService.getAllReservationsWithField().subscribe(
      (data: any[]) => {
        data.sort((a, b) => new Date(a[0].startDate).getTime() - new Date(b[0].startDate).getTime());
        this.reservations = data;
        console.log('Reservations with fields:', this.reservations);
      
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  getSportImage(typeField: string): string {
    switch (typeField) {
      case 'Football':
        return 'path_to_football_image'; // Replace 'path_to_football_image' with the actual path
      case 'Basketball':
        return 'path_to_basketball_image'; // Replace 'path_to_basketball_image' with the actual path
      // Add more cases for other sport types if needed
      default:
        return 'default_image_path'; // Return a default image path if typeField doesn't match any case
    }
  }
  navigateToAddReservation() {
    this.router.navigateByUrl('/add-reservation');
  }
  
  navigateToUpdate(reservationId: number) {
    this.router.navigate(['/update-reservation', reservationId]);
  }


}
