import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-internshiprecommendation',
  templateUrl: './internshiprecommendation.component.html',
  styleUrls: ['./internshiprecommendation.component.css']
})
export class InternshiprecommendationComponent implements OnInit {

  recommendedInternships: Internship[] = [];
  userId: any;

  internship: Internship | null = null;
  selectedFile: File | null = null;
  messageSent: boolean = false;
  internshipId!: number;

  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor(
    private route: ActivatedRoute,
    private internshipService: InternshipService,
    private router: Router,
    private location: Location,
    private userTok: TokenService
  ) { }

  ngOnInit(): void {
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

    this.userId = this.userTok.currentUser();
    this.internshipService.recommendation(this.userId).subscribe(
      (internships: Internship[]) => {
        this.recommendedInternships = internships;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des recommandations de stage:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  showAlert(message: string) {
    window.alert(message);
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

    this.internshipService.addFile(this.internshipId, this.selectedFile, this.userId).subscribe(
      (response: any) => {
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
}
