import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-freelance-job',
  templateUrl: './update-freelance-job.component.html',
  styleUrls: ['./update-freelance-job.component.css']
})
export class UpdateFreelanceJobComponent implements OnInit {
  job: FreelanceJob = new FreelanceJob();
  jobId!: number;
  freelances: FreelanceJob[] = [];

  constructor(
    private freelanceService: FreelanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = Number(params['id']);
      this.getFreelanceJobById(this.jobId);
    });
  }

  updateFreelanceJob(): void {
    const deadlineString = formatDate(this.job.deadlineJob, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    this.job.deadlineJob=deadlineString;
    this.freelanceService.updateFreelanceJob(this.job).subscribe(
      (response: FreelanceJob) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Freelance job updated successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/freelance']);
          }
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the freelance job: ' + error.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  getFreelanceJobById(id: number): void {
    this.freelanceService.getFreelanceJobById(id).subscribe(
      (response: FreelanceJob) => {
        this.job = response;
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the freelance job: ' + error.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin/freelance']);
  }
}
