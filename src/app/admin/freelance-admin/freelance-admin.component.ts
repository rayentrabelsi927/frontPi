import { Component, OnInit } from '@angular/core';
import { FreelanceService } from 'src/app/services/freelance.service';
import { FreelanceJob } from './../../models/freelance';

@Component({
  selector: 'app-freelance-admin',
  templateUrl: './freelance-admin.component.html',
  styleUrls: ['./freelance-admin.component.css']
})
export class FreelanceAdminComponent implements OnInit {
  freelances: FreelanceJob[] = [];
  displayedColumns: string[] = ['jobId', 'titleJob', 'clientJob', 'durationJob', 'locationJob', 'skillsRequiredJob', 'descriptionJob', 'budgetJob', 'deadlineJob', 'actions'];

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
        // Handle error here
      }
    );
  }

  deleteFreelanceJob(jobId: number): void {
    this.freelanceService.deleteFreelanceJob(jobId).subscribe(
      () => {
        // Remove the freelance job from the list
        this.freelances = this.freelances.filter(job => job.jobId !== jobId);
      },
      (error) => {
        // Handle error here
        console.error("Error deleting freelance job:", error);
      }
    );
  }

  updateFreelanceJob(jobId: number): void {
    const freelanceJob = this.freelances.find(job => job.jobId === jobId);

    if (freelanceJob) {
      // Update properties of the freelance job here

      this.freelanceService.updateFreelanceJob(freelanceJob).subscribe(
        (response: FreelanceJob) => {
          // Handle freelance job update if necessary
        },
        (error) => {
          // Handle error here
        }
      );
    }
  }
}
