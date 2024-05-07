import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/Field';
import { FieldService } from 'src/app/services/field.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-all-fields',
  templateUrl: './all-fields.component.html',
  styleUrls: ['./all-fields.component.css']
})
export class AllFieldsComponent implements OnInit {
  fields: Field[] = [];
  
  
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get pagedFields(): Field[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.fields.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.fields.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }


  constructor(private fieldService: FieldService,private router: Router,private userTok: TokenService) { }

  ngOnInit(): void {
    this.loadAllFields();
  }

  loadAllFields(): void {
    this.fieldService.getAllFields().subscribe(
      (fields: Field[]) => {
        this.fields = fields;
      },
      (error: any) => {
        console.error('Error fetching fields:', error);
      }
    );
  }

  fetchAllFields(): void {
    this.fieldService.getAllFields().subscribe(
      (data: Field[]) => {
        this.fields = data;
      },
      (error: any) => {
        console.error('Error fetching fields:', error);
      }
    );
  }

 
  deleteField(fieldId: number): void {
    this.fieldService.deleteField(fieldId).subscribe(
      () => {
        console.log('Field deleted successfully.');
        this.fetchAllFields();
      },
      (error: any) => {
        console.error('Error deleting field:', error);
      }
    );
  }

  navigateToAddField(): void {
    this.router.navigate(['/admin/add-field']);
  }

}
