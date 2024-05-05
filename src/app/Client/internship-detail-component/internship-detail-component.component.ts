import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-internship-detail-component',
  templateUrl: './internship-detail-component.component.html',
  styleUrls: ['./internship-detail-component.component.css']
})
export class InternshipDetailComponentComponent implements OnInit {
  internship: Internship | null = null;
  selectedFile: File | null = null;
  messageSent: boolean = false;
  internshipId!:number;

  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor(
    private route: ActivatedRoute,
    private internshipService: InternshipService,
    private router: Router,
    private location: Location
    ) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const internshipId = params.get('id');
        if (internshipId) {
          this.internshipId = parseInt(internshipId, 10);
          this.internshipService.getInternshipById(this.internshipId).subscribe(
            internship => {
              this.internship = internship;
            },
            error => {
              console.error(error);
            }
          );
        }
      });
    }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addFile() {
    if (!this.selectedFile) {
      console.log('Aucun fichier sélectionné.');
      return;
    }

    const maxSizeInBytes = 10485760; // 10 Mo (en octets)
    if (this.selectedFile.size > maxSizeInBytes) {
      console.log('La taille du fichier dépasse la limite autorisée.');
      return;
    }

    console.log('Fichier sélectionné :', this.selectedFile);
    this.internshipService.addFile(this.internshipId, this.selectedFile).subscribe(      (response: any) => {
        console.log('Fichier ajouté avec succès !', response);
        // Afficher une alerte
        alert('Demande envoyée !');
        // Redirection vers la page internships
        this.router.navigate(['/internships']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du fichier :', error);
        // Afficher un message d'erreur si nécessaire
      }
    );
  }

  goBack() {
    this.router.navigate(['/internships']);
  }

  redirectToInternships() {
    this.router.navigate(['/internships']);
  }

  showAlert(message: string) {
    window.alert(message);
  }
}
