import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/models/Field';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-update-reservation',
  templateUrl: './admin-update-reservation.component.html',
  styleUrls: ['./admin-update-reservation.component.css']
})
export class AdminUpdateReservationComponent implements OnInit {
  // reservationId!: number;
  // reservationForm!: FormGroup;
  // reservation: any | null = null;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private formBuilder: FormBuilder,
  //   private reservationService: ReservationService
  // ) { }

  // ngOnInit(): void {
  //   this.reservationId = +this.route.snapshot.paramMap.get('id')!;
  //   this.loadReservation();
  //   // this.route.paramMap.subscribe(params => {
  //   //   const id = params.get('id');
  //   //   if (id !== null && !isNaN(Number(id))) {
  //   //     this.reservationId = +id;
  //   //     this.loadReservation();
  //   //   } else {
  //   //     console.error('Invalid reservation ID found in route parameters');
  //   //   }
  //   // });
  //   this.reservationForm = this.formBuilder.group({
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required],
  //     resStatus: ['', Validators.required],
  //     resType: ['', Validators.required],
  //     field: ['', Validators.required]
  //   });
  // }

  // loadReservation() {
  //   this.reservationService.getReservation(this.reservationId).subscribe(
  //     (data) => {
  //       this.reservation = data?.reservation || null; 
  //       if (this.reservation) {
  //         this.reservationForm.patchValue({
  //           startDate: this.reservation.startDate,
  //           endDate: this.reservation.endDate,
  //           resStatus: this.reservation.resStatus,
  //           resType: this.reservation.resType,
  //           field: this.reservation.field  // Assuming field is an object with fieldId
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error loading reservation:', error);
  //     }
  //   );
  // }

  // onSubmit() {
  //   console.log('Form submitted');
  //   if (this.reservationForm.invalid || !this.reservation) {
  //     return;
  //   }
  
  //   const updatedReservation = { ...this.reservationForm.value };
  //   console.log('Updated reservation:', updatedReservation);
  
  //   this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe(
  //     (response) => {
  //       console.log('Reservation updated successfully:', response);
  //       // Reservation updated successfully, navigate to all-reservations or any other page
  //       console.log('Navigating to all-reservations page');
  //       this.router.navigateByUrl('/admin/all-reservations');
  //     },
  //     (error) => {
  //       console.error('Error updating reservation:', error);
  //     }
  //   );
  // }
  
  reservationId!: number;
  reservationForm!: FormGroup;
  reservation: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private userTok: TokenService
  ) { }

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;
    this.loadReservation();
    this.reservationForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      resStatus: ['', Validators.required],
      resType: ['', Validators.required],
      field: ['', Validators.required]
    });
  }

  loadReservation() {
    this.reservationService.getReservation(this.reservationId).subscribe(
      (data) => {
        this.reservation = data?.reservation || null; 
        if (this.reservation) {
          this.reservationForm.patchValue({
            startDate: this.reservation.startDate,
            endDate: this.reservation.endDate,
            resStatus: this.reservation.resStatus,
            resType: this.reservation.resType,
            field: this.reservation.field  // Assuming field is an object with fieldId
          });
        }
      },
      (error) => {
        console.error('Error loading reservation:', error);
      }
    );
  }

  onSubmit() {
    if (this.reservationForm.invalid || !this.reservation) {
      return;
    }

    const updatedReservation = { ...this.reservationForm.value };
    this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe(
      (response) => {
        // Reservation updated successfully, navigate to all-reservations or any other page
        this.router.navigateByUrl('/admin/all-reservations');
      },
      (error) => {
        console.error('Error updating reservation:', error);
      }
    );
  }
}
