import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FreelanceJob } from 'src/app/models/freelance';
import { Router } from '@angular/router';
import { FreelanceService } from './../../services/freelance.service';

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.css']
})
export class FreelanceComponent implements OnInit {
  freelanceJobs: FreelanceJob[] = [];
  items: FreelanceJob[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(private freelanceService: FreelanceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllFreelanceJobs();
  }

  private getAllFreelanceJobs(): void {
    this.freelanceService.getAllFreelanceJobs().subscribe(
      (response: FreelanceJob[]) => {
        this.freelanceJobs = response;
        this.totalItems = this.freelanceJobs.length;
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
    this.items = this.paginate(this.freelanceJobs, this.pageSize, this.currentPage);
  }

  showDetails(freelanceJob: FreelanceJob) {
    this.router.navigate(['/freelance', freelanceJob.jobId]);
  }
}
