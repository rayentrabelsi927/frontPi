import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Internship } from 'src/app/models/internship';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-internship-detail-component',
  templateUrl: './internship-detail-component.component.html',
  styleUrls: ['./internship-detail-component.component.css']
})
export class InternshipDetailComponentComponent implements OnInit {
  internship: Internship | null = null;
  selectedFile: File | null = null;
  messageSent: boolean = false;

  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor(
    private route: ActivatedRoute,
    private internshipService: InternshipService,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const internshipId = params.get('id');
      if (internshipId) {
        const id = Number(internshipId);
        this.internshipService.getInternshipById(id).subscribe(
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

  uploadFile() {
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

    this.internshipService.addFile(this.selectedFile)
      .subscribe(
        (response: any) => {
          console.log('Fichier ajouté avec succès !', response);
          // Afficher un message indiquant que la demande a été envoyée
          alert('Demande envoyée !');
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


}
