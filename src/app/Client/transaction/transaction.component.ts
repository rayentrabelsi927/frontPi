import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/Feedback';
import { Transaction } from 'src/app/models/Transaction';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  errorMessage = '';

  feedbackposts: { [key: number]: { commentaire: string, rating: number } } = {}; // Map pour stocker les commentaires et les notations par transaction
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTransactions(); // Appel de la méthode pour récupérer les données
  }

  getAllTransactions(): void {
    this.transactionService.getAll().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;

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

  // Vérifier si le commentaire ou le rating est vide
  if (!comment || !rating) {
    alert('Veuillez remplir tous les champs avant de poster le feedback.');
    return; // Sortir de la fonction si les champs ne sont pas remplis
  }

    console.log('Feedback Data:', feedbackData);
    console.log('Rating:', rating);
  
    // Appel de la méthode pour ajouter le feedback
    this.transactionService.addFeedbackToTransaction(transactionId, feedbackData).subscribe(response => {
      console.log('Feedback added to transaction:', response);
      this.getAllTransactions();
    }, error => {
      console.error('Error adding feedback to transaction:', error);
    });
  }

  
  setRating(transactionId: number, rating: number): void {
    this.feedbackposts[transactionId].rating = rating;
    console.log('Rating set for transactionId', transactionId, ':', rating);
  }
  
}
