import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-internship',
  templateUrl: './new-internship.component.html',
  styleUrls: ['./new-internship.component.css']
})
export class NewInternshipComponent {
  internship: Internship = new Internship();
  userId: any;

  constructor(private internshipService: InternshipService, private router: Router,  private userTok: TokenService
  ) {}

  createInternship(internship: Internship): void {
    this.userId = this.userTok.currentUser();
    const deadlineString = formatDate(internship.deadlineInternship, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    internship.deadlineInternship = deadlineString;

    this.internshipService.createInternship(internship, this.userId).subscribe(
      (response: Internship) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Internship created successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/internship']);
          }
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the internship: ' + error.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }


  goBack() {
    this.router.navigate(['/admin/internship']);
  }
}
