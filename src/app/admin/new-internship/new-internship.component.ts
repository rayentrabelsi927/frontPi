import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-new-internship',
  templateUrl: './new-internship.component.html',
  styleUrls: ['./new-internship.component.css']
})
export class NewInternshipComponent {
  internship: Internship = new Internship();

  constructor(private internshipService: InternshipService,private router: Router  ) {}

  createInternship(internship: Internship): void {
    this.internshipService.createInternship(internship).subscribe(
      (response: Internship) => {
        // Gérer la réponse de la création du stage si nécessaire
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
