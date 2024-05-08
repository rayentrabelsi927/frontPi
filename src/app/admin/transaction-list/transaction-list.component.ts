import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/Transaction';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  filteredTransactions: Transaction[] = [];
  searchQuery: string = '';
  errorMessage = '';
  searchValue: string = '';
  mapUrl: SafeResourceUrl = '';


  feedbackposts: { [key: number]: { commentaire: string, rating: number } } = {}; // Map pour stocker les commentaires et les notations par transaction
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService,private sanitizer: DomSanitizer, private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.searchTransactionsByUser(this.searchQuery); 

  }
 
  

  updateMapUrl(location:any ) {
    const encodedValue = encodeURIComponent(location.trim());
    const url = `https://maps.google.com/maps?q=${encodedValue}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  
  
  getAllTransactions(): void {
    this.transactionService.getAll().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
console.log(this.transactions)
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

  
  

  searchTransactionsByUser(searchQuery: any) {
    this.transactionService.getAll().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        console.log(this.transactions);
  
        this.transactions.forEach(transaction => {
          this.feedbackposts[transaction.transactionId] = { commentaire: '', rating: 0 };
        });
  
        if (searchQuery && searchQuery.trim() !== '') {
          const trimmedQuery = searchQuery.trim();
          const montant = Number(trimmedQuery);
  
          if (!isNaN(montant)) {
            // Recherche par montant (number)
            this.filteredTransactions = this.transactions.filter(transaction =>
              transaction.amountTransaction === montant
            );
          } else {
            // Recherche par nom d'utilisateur (username) ou rôle (role)
            const searchRole = trimmedQuery.toLowerCase();
            this.filteredTransactions = this.transactions.filter(transaction =>
              transaction.users.email.toLowerCase().includes(searchRole) ||
              transaction.users.role.toLowerCase().includes(searchRole)
            );
          }
        } else {
          this.filteredTransactions = this.transactions;
        }
  
        console.log(this.filteredTransactions);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des transactions :', error);
      }
    );
  }
  
  
  

  
}
