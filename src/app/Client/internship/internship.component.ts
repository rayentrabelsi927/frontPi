import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from './../../services/internship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internships: Internship[] = [];

  constructor(private internshipService: InternshipService,private router: Router) {}

  ngOnInit(): void {
    this.getAllInternships();
  }

  private getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(
      (response: Internship[]) => {
        this.internships = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showDetails(internship: Internship) {
    this.router.navigate(['/internships', internship.internshipId]);
  }

}
