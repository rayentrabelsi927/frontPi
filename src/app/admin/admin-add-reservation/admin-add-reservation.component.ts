import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Field } from 'src/app/models/Field';
import { TypeR } from 'src/app/models/Reservation';
import { TypeF } from 'src/app/models/TypeF';
import { FieldService } from 'src/app/services/field.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-add-reservation',
  templateUrl: './admin-add-reservation.component.html',
  styleUrls: ['./admin-add-reservation.component.css']
})
export class AdminAddReservationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private reservationService: ReservationService,
    private fieldService: FieldService,private userTok: TokenService
  ) { }
  addReservationForm!: FormGroup;
  reservationTypes: string[] = Object.values(TypeR);
  startDate!: Date;
  endDate!: Date;  
  fieldTypes: string[] = Object.values(TypeF);
  fields: Field[] = []; // Assuming you fetch fields from somewhere
  
  ngOnInit() {
    this.addReservationForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      resStatus: ['pending'],
      resType: ['', Validators.required],
      field: ['', Validators.required] // Use the same property name 'field'
    });
    this.fieldService.getAllFields().subscribe(fields => {
      this.fields = fields;
    });
  }

  onSubmit() {
    if (this.addReservationForm.invalid) {
      return;
    }
  
    const { startDate, endDate, resStatus, resType, field } = this.addReservationForm.value;
  
    console.log(field); // Log the selected field
  
    const userId = 14; // Assuming you have the user ID
    const fieldId = field.fieldId; // Accessing fieldId from selected field
    const reservation = { startDate, endDate, resStatus, resType };
  
    this.reservationService.makeReservationForUser(userId, fieldId, reservation).subscribe(
      (response) => {
        // Reservation created successfully, navigate to all-reservations or any other page
        this.router.navigateByUrl('/admin/all-reservations');
      },
      (error) => {
        // Handle error
        console.error('Error creating reservation:', error);
      }
    );

}
}
