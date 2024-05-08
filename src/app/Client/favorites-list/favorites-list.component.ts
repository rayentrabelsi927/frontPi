import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { FavoritesListService } from 'src/app/services/favorites-list.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent {
  favoritesL: Article[] = [];


  
  constructor(private favorites: FavoritesListService, private router: Router) {}
  

  ngOnInit(): void {
    this.favoritesL = this.favorites.getFavorites();
    
  }

  removeFromFavorites(articleId: number): void {
    this.favorites.removeFromFavorites(articleId);
    this.favoritesL = this.favorites.getFavorites();
  }

  updateNote(articleId: number, note: string): void {
    this.favorites.updateNote(articleId, note);
    this.favoritesL = this.favorites.getFavorites();
  }


  


  viewSections(): void {
    this.router.navigate(['/sections']);
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