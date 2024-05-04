import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartArticleService {
  private readonly CART_KEY = 'cart';
  private cartChanged = new Subject<void>();

  constructor() { }

  private getCartFromSession(): Article[] {
    const cartData = sessionStorage.getItem(this.CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }

  private saveCartToSession(cart: Article[]): void {
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCart(): Article[] {
    return this.getCartFromSession();
  }

  addToCart(article: Article): void {
    let cart = this.getCartFromSession();
    const existingArticle = cart.find(a => a.articleId === article.articleId);
    if (existingArticle) {
      return;
    }
  
    cart.push(article);
    this.saveCartToSession(cart);
    this.cartChanged.next(); 
  }
  

  removeFromCart(articleId: number): void {
    let cart = this.getCartFromSession();
    cart = cart.filter(a => a.articleId !== articleId);
    this.saveCartToSession(cart);
    this.cartChanged.next(); 
  }

  getTotal(): number {
    const cart = this.getCartFromSession();
    return cart.reduce((total, article) => total + article.priceArticle, 0);
  }

  clearCart(): void {
    sessionStorage.removeItem(this.CART_KEY);
  }

  countArticles(): number {
    const favorites = this.getCart();
    return favorites.length;
  }

  getCartChangedObservable(): Observable<void> {
    return this.cartChanged.asObservable();
  }


}
