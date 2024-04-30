import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/models/Field';
import { TypeF } from 'src/app/models/TypeF';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-update-field',
  templateUrl: './update-field.component.html',
  styleUrls: ['./update-field.component.css']
})
export class UpdateFieldComponent implements OnInit {

  fieldId!: number;
  field: Field = {
    fieldId: 0,
    nameField: '',
    descriptionField: '',
    locationField: '',
    capacityField: 0,
    typeField: TypeF.Football // Set default value
  };

  // Define the types array
  types: TypeF[] = [TypeF.Football, TypeF.Basketball, TypeF.Handball, TypeF.Tennis, TypeF.Volleyball];


  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private router:Router
  ) { }

  ngOnInit(): void {
    // Retrieve the field ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.fieldId = +idParam; // Convert the parameter to a number
        // Fetch the field details based on the ID
        this.fetchFieldDetails();
      } else {
        console.error('Field ID parameter is null.');
      }
    });
  }
  

  fetchFieldDetails(): void {
    this.fieldService.getFieldById(this.fieldId).subscribe(
      (data: Field) => {
        this.field = data;
      },
      (error: any) => {
        console.error('Error fetching field details:', error);
      }
    );
  }

  onSubmit(): void {
    this.fieldService.updateField(this.field).subscribe(
      response => {
        console.log('Field updated successfully:', response);
        // Redirect to the all-fields component after successful update
        // You can implement this similar to the AddFieldComponent
        this.router.navigate(['/admin/all-fields']);
      },
      error => {
        console.error('Error updating field:', error);
      }
    );
  }
}
