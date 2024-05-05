import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-update-internship',
  templateUrl: './update-internship.component.html',
  styleUrls: ['./update-internship.component.css']
})
export class UpdateInternshipComponent implements OnInit {
  internship: Internship = new Internship();
  internshipId!: number;

  constructor(
    private internshipService: InternshipService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.internshipId = Number(params['id']);
      this.getInternshipById(this.internshipId);
    });
  }

  updateInternship(internship: Internship): void {
    this.internshipService.updateInternship(this.internshipId, internship).subscribe(
      (response: Internship) => {
        // Gérer la réponse de la mise à jour du stage si nécessaire
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getInternshipById(id: number): void {
    this.internshipService.getInternshipById(id).subscribe(
      (response: Internship) => {
        this.internship = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin/internship']);
  }
}
