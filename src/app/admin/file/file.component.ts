import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  files: any[] = []; // Initialisation de la propriété files avec un tableau vide

  constructor(private internshipService: InternshipService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.internshipService.getFiles().subscribe(
      (data) => {
        this.files = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des fichiers : ', error);
      }
    );
  }
  deleteFile(fileID: number): void {
    this.internshipService.deleteFile(fileID).subscribe(() => {
      // Si la suppression réussit, mettez à jour la liste des fichiers pour refléter les changements
      this.getFiles();
    });
  }

  


}
