import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-internship-admin',
  templateUrl: '../internship-admin/internship-admin.component.html',
  styleUrls: ['../internship-admin/internship-admin.component.css']
})
export class InternshipAdminComponent implements OnInit {
  internships: Internship[] = [];

  constructor(private internshipService: InternshipService) {}

  ngOnInit() {
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


  /*
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
  */

  getInternshipById(internshipId: number): void {
  this.internshipService.getInternshipById(internshipId).subscribe(
  (response: Internship) => {
  // Gérer la réponse de la récupération du stage si nécessaire
  },
  (error: HttpErrorResponse) => {
  alert(error.message);
  }
  );
  }

  updateInternship(internshipId: number, internship: Internship): void {
  this.internshipService.updateInternship(internshipId, internship).subscribe(
  (response: Internship) => {
  // Gérer la réponse de la mise à jour du stage si nécessaire
  },
  (error: HttpErrorResponse) => {
  alert(error.message);
  }
  );
  }

  deleteInternship(internshipId: number): void {
    this.internshipService.deleteInternship(internshipId).subscribe(
      () => {
        // Supprimer le stage de la liste internships
        this.internships = this.internships.filter(internship => internship.internshipId !== internshipId);
      },
      error => {
        console.error("Erreur lors de la suppression du stage :", error);
      }
    );
  }
  }



