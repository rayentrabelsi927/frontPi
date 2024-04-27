import { Component, OnInit } from '@angular/core';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';

@Component({
  selector: 'app-freelance-admin',
  templateUrl: './freelance-admin.component.html',
  styleUrls: ['./freelance-admin.component.css']
})
export class FreelanceAdminComponent implements OnInit {
  freelances: FreelanceJob[] = [];

  constructor(private freelanceService: FreelanceService) {}

  ngOnInit() {
    this.getAllFreelanceJobs();
  }

  private getAllFreelanceJobs(): void {
    this.freelanceService.getAllFreelanceJobs().subscribe(
      (response: FreelanceJob[]) => {
        this.freelances = response;
      },
      (error) => {
        // Gérer l'erreur ici
      }
    );
  }

  deleteFreelanceJob(jobId: number): void {
    this.freelanceService.deleteFreelanceJob(jobId).subscribe(
      () => {
        // Gérer la suppression du freelance job si nécessaire
      },
      (error) => {
        // Gérer l'erreur ici
      }
    );
  }

  updateFreelanceJob(jobId: number): void {
    const freelanceJob = this.freelances.find(job => job.jobId === jobId);

    if (freelanceJob) {
      // Mettez à jour les propriétés du freelance job ici

      this.freelanceService.updateFreelanceJob(freelanceJob).subscribe(
        (response: FreelanceJob) => {
          // Gérer la mise à jour du freelance job si nécessaire
        },
        (error) => {
          // Gérer l'erreur ici
        }
      );
    }
  }
}


