import { Component, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/Feedback';
import { Transaction } from 'src/app/models/Transaction';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';
declare var require: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  
  errorMessage = '';
  mapUrl: SafeResourceUrl = '';
  feedbackposts: { [key: number]: { commentaire: string, rating: number } } = {}; // Map pour stocker les commentaires et les notations par transaction
  transactions: Transaction[] = [];
  userId!:any;
 
  constructor(private transactionService: TransactionService, private usertoken :TokenService,private sanitizer: DomSanitizer,private feedbackService: FeedbackService, private router: Router) { }
  
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userId=this.usertoken.currentUser();
    console.log(this.userId)
    this.getAllTransactions();
 

 
  }

  updateMapUrl(location: any): void {
    const encodedValue = encodeURIComponent(location.trim());
    const url = `https://maps.google.com/maps?q=${encodedValue}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  stringifyArticles(articles: any[]): string {
    let result = '';
    let total = 0;

    articles.forEach(article => {
      result += `${article.nameArticle}: ${article.priceArticle} euros\n`;
      total += article.priceArticle;
    });

    result += `Somme totale: ${total} euros`;

    return result;
  }

  stringifyhousing(housing: any): string {
    let result = '';
    let total = 0;

    
      result += `localisation :${housing.locationHousing}\n description: ${housing.descriptionHousing} \n`;
      total += housing.priceHousing;
   

    result += ` ${total} euros`;;

    return result;
  }


  qrcode(transaction:Transaction):string{
    let resultat='';
    if (transaction.housing==null){
      resultat=  this.stringifyArticles(transaction.articles);
    }
    else{
      resultat=  this.stringifyhousing(transaction.housing);
    }
    return resultat;
  }


  getAllTransactions(): void {
    this.transactionService.getTransactionById(    this.userId
).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
console.log(data);
        // Initialiser la map feedbackposts avec des objets vides pour chaque transaction
        this.transactions.forEach(transaction => {
          this.feedbackposts[transaction.transactionId] = { commentaire: '', rating: 0 };
        });
      },
      (error: any) => {
        console.error('Erreur lors du chargement des transactions :', error);
        // Traitez l'erreur ici, par exemple affichez un message à l'utilisateur
      }
    );
  }

  addFeedbackToTransaction(transactionId: number): void {
    const feedbackData = this.feedbackposts[transactionId];
    const comment = feedbackData.commentaire;
    const rating = feedbackData.rating;
    var Filter = require('bad-words'),
    filter = new Filter();
    filter.addWords('some', 'bad', 'word');

    // Vérifier si le commentaire ou le rating est vide
    if (!comment || !rating) {

      
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Veuillez remplir tous les champs avant de poster le feedback.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      
      return; // Sortir de la fonction si les champs ne sont pas remplis
    }

    console.log('Feedback Data:', feedbackData);
    console.log('Rating:', rating);

    if (filter.isProfane(comment)){
      feedbackData.commentaire=filter.clean(comment);
     }
     this.transactionService.addFeedbackToTransaction(transactionId, feedbackData).subscribe(response => {
      console.log('Feedback added to transaction:', response);
      this.getAllTransactions();
    }, error => {
      console.error('Error adding feedback to transaction:', error);
    });
    // Appel de la méthode pour ajouter le feedback
    
  }

  setRating(transactionId: number, rating: number): void {
    this.feedbackposts[transactionId].rating = rating;
    console.log('Rating set for transactionId', transactionId, ':', rating);
  }
}