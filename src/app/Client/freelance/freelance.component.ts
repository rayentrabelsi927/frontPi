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

  constructor(private FreelanceService: FreelanceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllFreelanceJobs();
  }

  private getAllFreelanceJobs(): void {
    this.FreelanceService.getAllFreelanceJobs().subscribe(
      (response: FreelanceJob[]) => {
        this.freelanceJobs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showDetails(freelanceJob: FreelanceJob) {
    this.router.navigate(['/freelance', freelanceJob.jobId]);
  }
}
