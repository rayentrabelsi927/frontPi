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
        // Handle the successful response here
        console.log('Internship created successfully:', response);
        alert('Internship created successfully');
        // Optionally, redirect the user to a different page
        this.router.navigate(['/admin/internships']);
      },
      (error: HttpErrorResponse) => {
        alert('An error occurred while creating the internship: ' + error.message);
      }
    );
  }


  goBack() {
    this.router.navigate(['/admin/internship']);
  }
}
