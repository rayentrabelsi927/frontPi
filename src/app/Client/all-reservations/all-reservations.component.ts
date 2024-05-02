import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {

  userIsCaptain: boolean = false;
  reservations: any[] = [];
  reservationsFiltered: any[] = [];
  userId!: number;
  hasJoinedReservations: boolean[] = [];
  startDate: string = ''; 
  status: string = '';
  fieldType: string = '';

  constructor(private reservationService: ReservationService, private sportTeamService: SportTeamService, private router: Router) {}


  ngOnInit(): void {
    this.userId = 2;
    this.checkIfUserIsCaptain();
    this.fetchAllReservations();
  }

  fetchAllReservations(): void {
    this.reservationService.getAllReservationsWithField().subscribe(
      (data: any[]) => {
        data.sort((a, b) => new Date(a[0].startDate).getTime() - new Date(b[0].startDate).getTime());
        this.reservations = data;
        this.reservationsFiltered = [...this.reservations]; // Update filtered array
        this.fetchJoinedReservations();
        console.log('Reservations with fields:', this.reservations);
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  checkIfUserIsCaptain(): void {
    this.sportTeamService.isUserCaptain(this.userId).subscribe(
      (isCaptain: boolean) => {
        this.userIsCaptain = isCaptain;
        console.log('Is user a captain:', isCaptain);
      },
      error => {
        console.error('Error checking if user is a captain:', error);
      }
    );
  }
  
  joinOrCancelReservation(reservationId: number, index: number): void {
    if (this.hasJoinedReservations[index]) {
      this.cancelReservation(reservationId);
    } else {
      this.joinReservation(reservationId, this.userId);
    }
  }

  cancelReservation(reservationId: number): void {
    this.reservationService.cancelUserReservation(this.userId, reservationId).subscribe(
      response => {
        console.log(response);
        this.fetchAllReservations(); 
      },
      error => {
        console.error(error);
        this.fetchAllReservations(); 
      }
    );
  }
  
  joinReservation(reservationId: number, userId: number): void {
    this.reservationService.joinReservation(reservationId, userId).subscribe(
      response => {
        console.log(response);
        this.fetchAllReservations();
      },
      error => {
        console.error(error);
        this.fetchAllReservations(); 
      }
    );
  }

  fetchJoinedReservations(): void {
    this.hasJoinedReservations = []; 
    this.reservations.forEach(reservation => {
      this.reservationService.hasUserJoinedReservation(reservation[0].reservationId, this.userId).subscribe(
        (hasJoined: boolean) => {
          this.hasJoinedReservations.push(hasJoined);
        },
        error => {
          console.error('Error fetching joined reservations:', error);
        }
      );
    });
  }

  navigateToAddReservation() {
    this.router.navigateByUrl('/add-reservation');
  }

  navigateToUpdate(reservationId: number) {
    this.router.navigate(['/update-reservation', reservationId]);
  }
  
  applyFilters(): void {

    this.reservationsFiltered = this.reservations.filter(reservation => {
      const startDateMatches = !this.startDate || new Date(reservation[0].startDate).toDateString() === new Date(this.startDate).toDateString();
      const reservationStatusLower = reservation[0].resStatus.toLowerCase();
      const filterStatusLower = this.status.toLowerCase();
      const statusMatches = !this.status || reservationStatusLower === filterStatusLower;
      const fieldTypeMatches = !this.fieldType || reservation[1].typeField.toLowerCase().includes(this.fieldType.toLowerCase());
      return startDateMatches && statusMatches && fieldTypeMatches;
    });
  }


}
