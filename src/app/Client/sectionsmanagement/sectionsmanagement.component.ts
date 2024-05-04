import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Section } from 'src/app/models/section';
import { FavoritesListService } from 'src/app/services/favorites-list.service';

@Component({
  selector: 'app-sectionsmanagement',
  templateUrl: './sectionsmanagement.component.html',
  styleUrls: ['./sectionsmanagement.component.css']
})
export class SectionsmanagementComponent implements OnInit {
  sectionName: string = '';
  sections: Section[] = [];
  selectedArticle: Article | null = null;
  favoritesL: Article[] = [];
  selectedSection: Section | null = null;

  constructor(private favorites: FavoritesListService) {}

  ngOnInit(): void {
    this.favoritesL = this.favorites.getFavorites();
    this.sections = this.favorites.getSections();

    this.sections.forEach((section) => {
      section.articles.forEach((article) => {
        const storedNote = localStorage.getItem(`note_${article.articleId}`);
        if (storedNote) {
          article.note = storedNote;
        }
      });
    });
  }

  createSection(): void {
    this.favorites.createSection(this.sectionName);
    this.sections = this.favorites.getSections();
    this.sectionName = '';
  }

  addToSection(article: Article | null, section: Section | null): void {
    if (article && section) {
      this.favorites.addToSection(article, section.name);
      section.articles.push(article);
    }
  }

  deleteSection(section: Section): void {
    this.favorites.deleteSection(section.name);
    this.sections = this.favorites.getSections();
  }

  saveNote(article: Article): void {
    localStorage.setItem(`note_${article.articleId}`, article.note || '');
  }

  printFavorites(): void {
    
    const nonPrintableElements = document.querySelectorAll('.no-print');
    nonPrintableElements.forEach(element => {
      element.classList.add('no-print-visible');
    });

    window.print();

    nonPrintableElements.forEach(element => {
      element.classList.remove('no-print-visible');
    });
  }
}

