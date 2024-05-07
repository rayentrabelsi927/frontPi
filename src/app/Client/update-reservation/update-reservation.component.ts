import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Field, Reservation } from 'src/app/models/Field';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {
  reservationId!: number;
  reservationForm!: FormGroup;
  reservation: any | null = null;
  userId!:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private userTok: TokenService
  ) { }

  ngOnInit(): void {
    this.userId = this.userTok.currentUser();
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
    
    this.reservationService.updateReservationForUser(this.userId, this.reservationId, updatedReservation).subscribe(
      (response) => {
        // Reservation updated successfully, navigate to all-reservations or any other page
        this.router.navigateByUrl('/all-reservations');
      },
      (error) => {
        console.error('Error updating reservation:', error);
      }
    );
  }
}
