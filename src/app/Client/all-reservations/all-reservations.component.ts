import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {
  
  userIsCaptain: boolean = false;
  reservations: any[] = [];
  reservationsFiltered: any[] = [];
  userId!: any;
  hasJoinedReservations: boolean[] = [];
  startDate: string = ''; 
  status: string = '';
  fieldType: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 3



  constructor(private reservationService: ReservationService, private sportTeamService: SportTeamService, private router: Router,private userTok: TokenService) {}


 

  get pagedReservations(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.reservations.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.reservations.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }

  


  ngOnInit(): void {
    this.userId = this.userTok.currentUser();
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
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel this reservation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.reservationService.cancelUserReservation(this.userId, reservationId).subscribe(
          response => {
            console.log(response);
          
            Swal.fire({
              title: 'Success!',
              text: 'You have successfully cancelled the reservation.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
             
              this.fetchAllReservations(); 
            });
          },
          error => {
            console.error(error);
           
            Swal.fire({
              title: 'Error!',
              text: 'Failed to cancel the reservation. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
           
            this.fetchAllReservations(); 
          }
        );
      }
    });
  }
  
  joinReservation(reservationId: number, userId: number): void {
   
    this.reservationService.joinReservation(reservationId, userId).subscribe(
      response => {
        console.log(response);
        
        Swal.fire({
          title: 'Error!',
          text: 'Failed to join the reservation. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          
          this.fetchAllReservations(); 
        });
      },
      error => {
        console.error(error);
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully joined the reservation.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          
          this.fetchAllReservations(); 
        });
      }
     
       
    );
  }


  // cancelReservation(reservationId: number): void {
  //   this.reservationService.cancelUserReservation(this.userId, reservationId).subscribe(
  //     response => {
  //       console.log(response);
  //       this.fetchAllReservations(); 
  //     },
  //     error => {
  //       console.error(error);
  //       this.fetchAllReservations(); 
  //     }
  //   );
  // }
  
  // joinReservation(reservationId: number, userId: number): void {
  //   this.reservationService.joinReservation(reservationId, userId).subscribe(
  //     response => {
  //       console.log(response);
  //       this.fetchAllReservations();
  //     },
  //     error => {
  //       console.error(error);
  //       this.fetchAllReservations(); 
  //     }
  //   );
  // }

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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toDateString(); 
  }
  
  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString(); 
  }
  
  

}
