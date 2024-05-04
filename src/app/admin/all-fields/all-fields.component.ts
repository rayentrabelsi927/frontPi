import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/Field';
import { FieldService } from 'src/app/services/field.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-fields',
  templateUrl: './all-fields.component.html',
  styleUrls: ['./all-fields.component.css']
})
export class AllFieldsComponent implements OnInit {
  // fields: Field[] = [];
  // items: any[] = [];
  // pageSize: number = 5; // Change this value based on your requirement
  // currentPage: number = 1;
  // totalItems: number = 0;
  // totalPages: number = 0;
  // pagesArray: number[] = [];

  // constructor(private fieldService: FieldService,private router: Router) { }

  // ngOnInit(): void {
  //   this.loadAllFields();
  // }

  // loadAllFields(): void {
  //   this.fieldService.getAllFields().subscribe(
  //     (fields: Field[]) => {
  //       this.fields = fields;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching fields:', error);
  //     }
  //   );
  // }

  // fetchAllFields(): void {
  //   this.fieldService.getAllFields().subscribe(
  //     (data: Field[]) => {
  //       this.fields = data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching fields:', error);
  //     }
  //   );
  // }

 
  // deleteField(fieldId: number): void {
  //   this.fieldService.deleteField(fieldId).subscribe(
  //     () => {
  //       console.log('Field deleted successfully.');
  //       // Update the list of fields after deletion
  //       this.fetchAllFields();
  //     },
  //     (error: any) => {
  //       console.error('Error deleting field:', error);
  //     }
  //   );
  // }

  // navigateToAddField(): void {
  //   this.router.navigate(['/admin/add-field']);
  // }
  fields: any[] = [];
  items: any[] = [];
  pageSize: number = 5; // Change this value based on your requirement
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {
    this.fetchAllFields();
  }

  fetchAllFields(): void {
    this.fieldService.getAllFields().subscribe(
      (data: any[]) => {
        this.fields = data;
        this.totalItems = this.fields.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        this.changePage(this.currentPage);
      },
      error => {
        console.error('Error fetching fields:', error);
      }
    );
  }

  paginate(array: any[], pageSize: number, pageNumber: number): any[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.items = this.paginate(this.fields, this.pageSize, this.currentPage);
  }
}
