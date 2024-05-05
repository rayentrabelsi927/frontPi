import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from './../../services/internship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internships: Internship[] = [];
  items: Internship[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(private internshipService: InternshipService, private router: Router) {}

  ngOnInit(): void {
    this.getAllInternships();
  }

  private getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(
      (response: Internship[]) => {
        this.internships = response;
        this.totalItems = this.internships.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        this.changePage(this.currentPage);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  paginate(array: any[], pageSize: number, pageNumber: number): any[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.items = this.paginate(this.internships, this.pageSize, this.currentPage);
  }

  showDetails(internship: Internship) {
    this.router.navigate(['/internships', internship.internshipId]);
  }

}
