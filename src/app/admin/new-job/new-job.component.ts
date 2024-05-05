import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent {
  job: FreelanceJob = new FreelanceJob(); // Déclarez et initialisez la propriété job avec une instance de la classe Freelance

  constructor(private freelanceService: FreelanceService,private router: Router ) {}

  createFreelance(job: FreelanceJob) {
    this.freelanceService.addFreelanceJob(job)
      .subscribe(response => {
        // Assuming response contains information about the success of the operation
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
      });
  }


  goBack() {
    this.router.navigate(['/admin/freelance']);
  }
}
