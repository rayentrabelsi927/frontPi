import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Field } from 'src/app/models/Field';
import { TypeF } from 'src/app/models/TypeF';
import { FieldService } from 'src/app/services/field.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  field: Field = {
    fieldId: 0,
    nameField: '',
    descriptionField: '',
    locationField: '',
    capacityField: 0,
    typeField: TypeF.Football 
  };

  constructor(private fieldService: FieldService,private router: Router,private userTok: TokenService) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.fieldService.addField(this.field).subscribe(
      response => {
        console.log('Field added successfully:', response);
        this.field = {
          fieldId: 0,
          nameField: '',
          descriptionField: '',
          locationField: '',
          capacityField: 0,
          typeField: TypeF.Football 
        };
        this.router.navigate(['/admin/all-fields']);
      },
      error => {
        console.error('Error adding field:', error);
      }
    );
  }

}
