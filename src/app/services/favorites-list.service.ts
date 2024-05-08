import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Section } from '../models/section';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavoritesListService{
  private key = 'favorites';

  private listChanged = new Subject<void>();
  
  constructor() { }
  
  addToFavorites(article: Article): void {
    let favorites = this.getFavorites();
    if (!favorites.some(fav => fav.articleId === article.articleId)) {
      favorites.push(article);
      this.listChanged.next(); 
      localStorage.setItem(this.key, JSON.stringify(favorites));
    }
  }
  
  removeFromFavorites(articleId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.articleId !== articleId);
    localStorage.setItem(this.key, JSON.stringify(favorites));
    this.listChanged.next(); 
  }
  
  getFavorites(): Article[] {
    let favorites = localStorage.getItem(this.key);
    return favorites ? JSON.parse(favorites) : [];
  }
  
  clearFavorites(): void {
    localStorage.removeItem(this.key);
  }
  
  updateNote(articleId: number, note: string): void {
    let favorites = this.getFavorites();
    let index = favorites.findIndex(fav => fav.articleId === articleId);
    if (index !== -1) {
      favorites[index].note = note;
      localStorage.setItem(this.key, JSON.stringify(favorites));
    }
  }
  
  createSection(sectionName: string): void {
    let sections = this.getSections();
    if (!sections.find(s => s.name === sectionName)) {
      sections.push({ name: sectionName, articles: [] });
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }
  
  getSections(): Section[] {
    let sections = localStorage.getItem('sections');
    return sections ? JSON.parse(sections) : [];
  }
  
  addToSection(article: Article, sectionName: string): void {
    let sections = this.getSections();
    let section = sections.find(s => s.name === sectionName);
    if (section) {
      section.articles.push(article);
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }
  
  deleteSection(sectionName: string): void {
    let sections = this.getSections();
    const index = sections.findIndex(s => s.name === sectionName);
    if (index !== -1) {
      sections.splice(index, 1);
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }
  
  countFavorites(): number {
    const favorites = this.getFavorites();
    return favorites.length;
  }
  
  getlistChangedObservable(): Observable<void> {
    return this.listChanged.asObservable();
  }
  
  }