import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelanceJob } from 'src/app/models/freelance';
import { FreelanceService } from 'src/app/services/freelance.service';

@Component({
  selector: 'app-freelance-detail-component',
  templateUrl: './freelance-detail-component.component.html',
  styleUrls: ['./freelance-detail-component.component.css']
})
export class FreelanceDetailComponentComponent implements OnInit {
  freelance: FreelanceJob | null = null;

  constructor(
    private route: ActivatedRoute,
    private freelanceService: FreelanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const freelanceId = params.get('id');
      if (freelanceId) {
        const id = Number(freelanceId);
        this.freelanceService.getFreelanceJobById(id).subscribe(
          freelance => {
            this.freelance = freelance;
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }

  goBack() {
    this.router.navigate(['/freelances']);
  }

}
