import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin-all-reservations',
  templateUrl: './admin-all-reservations.component.html',
  styleUrls: ['./admin-all-reservations.component.css']
})
export class AdminAllReservationsComponent implements OnInit{

  reservations: any[] = [];

  constructor(private reservationService: ReservationService,private router: Router) {}
  
  ngOnInit(): void {
    this.fetchAllReservations();
  }

  fetchAllReservations(): void {
    this.reservationService.getAllReservationsWithField().subscribe(
      (data: any[]) => {
        this.reservations = data;
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  navigateToAddReservation() {
    this.router.navigateByUrl('admin/add-reservation');
  }
  
  navigateToUpdate(reservation: any) {
    const reservationId = reservation[0].reservationId; // Assuming reservationId is nested within the first object of the reservation array
    if (reservationId) {
      this.router.navigateByUrl(`admin/update-team/${reservationId}`);
    } else {
      console.error('Invalid reservation ID:', reservationId);
    }
  }
  
  
  
  

  cancelReservation(reservationId: number) {
    // Call service method to cancel the reservation
    this.reservationService.cancelReservation(reservationId).subscribe(
      (response) => {
        // Refresh reservations after cancelation
        this.fetchAllReservations();
      },
      (error) => {
        console.error('Error canceling reservation:', error);
      }
    );
  }

}
