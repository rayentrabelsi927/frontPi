import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';
import Swal from 'sweetalert2';

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
    const deadlineString = formatDate(internship.deadlineInternship, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
    this.internshipService.updateInternship(this.internshipId, internship).subscribe(
      (response: Internship) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Internship updated successfully!',
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
          text: 'An error occurred while updating the internship: ' + error.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  getInternshipById(id: number): void {
    this.internshipService.getInternshipById(id).subscribe(
      (response: Internship) => {
        this.internship = response;
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the internship: ' + error.message,
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
