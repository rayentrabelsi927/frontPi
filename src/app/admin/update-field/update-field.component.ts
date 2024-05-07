import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/models/Field';
import { TypeF } from 'src/app/models/TypeF';
import { FieldService } from 'src/app/services/field.service';
import { TokenService } from 'src/app/services/token.service';

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
    typeField: TypeF.Football 
  };

 
  types: TypeF[] = [TypeF.Football, TypeF.Basketball, TypeF.Handball, TypeF.Tennis, TypeF.Volleyball, TypeF.PingPong];


  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private router:Router,
    private userTok: TokenService
  ) { }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.fieldId = +idParam; 
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
        
        this.router.navigate(['/admin/all-fields']);
      },
      error => {
        console.error('Error updating field:', error);
      }
    );
  }
}
