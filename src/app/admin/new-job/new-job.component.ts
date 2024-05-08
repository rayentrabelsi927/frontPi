import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent {
  job: FreelanceJob = new FreelanceJob(); // Déclarez et initialisez la propriété job avec une instance de la classe Freelance
  userId!:any;
  constructor(private freelanceService: FreelanceService,private router: Router,    private userTok:TokenService) {
  }




  createFreelance(job: FreelanceJob) {
    const deadlineString = formatDate(this.job.deadlineJob, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    this.job.deadlineJob=deadlineString;
    this.userId = this.userTok.currentUser();
    this.freelanceService.addFreelanceJob(job, this.userId)
    .subscribe(response => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Freelance job added successfully!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/freelance']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add freelance job',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the freelance job',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      });
  }


  goBack() {
    this.router.navigate(['/admin/freelance']);
  }
}
