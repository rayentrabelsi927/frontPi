import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent {
  job: FreelanceJob = new FreelanceJob(); // Déclarez et initialisez la propriété job avec une instance de la classe Freelance

  constructor(private freelanceService: FreelanceService,private router: Router ) {}

  createFreelance(job: FreelanceJob) {
    this.freelanceService.addFreelanceJob(job) // Utilisez la méthode appropriée de votre service FreelanceService pour ajouter le freelance
      .subscribe(response => {
        // Gérez la réponse de la création du freelance
      });
  }

  goBack() {
    this.router.navigate(['/admin/freelance']);
  }
}
