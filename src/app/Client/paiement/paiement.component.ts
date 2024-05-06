import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaiementService } from 'src/app/services/paiement.service';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction_ban } from 'src/app/models/transaction_ban';

const environment = {
  production: false,
  stripe: 'pk_test_51Oz6fDRqZpxfJakaVhNnthrrrLDDvwGzM9ob8vPtIknT9zSQZCKAVxwAmlsKAKtKpgjlvNvy69DYhnKmIRwEYqAG004YSQ4ePE', // Remplacez par votre clé publique Stripe
  serverUrl: '/api',
};

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  possible: transaction_ban | undefined ;

  stripePromise = loadStripe(environment.stripe);
  productName: string = 'Iphone X';
  /*userconnnecté:any={
    "userId": 1,
    "username": "rayen"};*/

    userconnnecté:any={
      "userId": 12,
      "username": null,
      "firstName": "nouha",
      "lastName": "bouallegue",
      "email": "ines.yeddes@esprit.tn",
      "password": "$2a$10$78JbGyOjhIu1ss2uRd6fi.XSaH8YS/FAzxap.nyJTL55vRaw1RE1u",
      "phone": 0,
      "imgUser": null,
      "role": "student",
      "lastLogin": null,
      "accountLocked": false,
      "enabled": true,
      "createdDate": [
          2024,
          5,
          6,
          17,
          6,
          34
      ],
      "lastModifiedDate": [
          2024,
          5,
          6,
          17,
          8,
          12
      ],
      "badge": null,
      "participationTeam": false,
      "complaints": [],
      "internships": null,
      "participants": [],
      "jobs": [],
      "name": "ines.yeddes@esprit.tn",
      "authorities": [
          {
              "authority": "ROLE_STUDENT"
          }
      ],
      "credentialsNonExpired": true,
      "accountNonExpired": true,
      "accountNonLocked": true
  };

  productPrice: number = 50;
  articleList: any[] =  [{"articleId":7,"categoryArticle":"Technology","conditionArticle":"Fair","descriptionArticle":"123"}];

constructor(private paiementService: PaiementService,private transactionservice : TransactionService,private router: Router) { }

  ngOnInit(): void {
    

      this.transactionservice.getByIdIfBnned(this.userconnnecté.userId).subscribe(data => {
      this.possible = data as transaction_ban;
      console.log(this.possible.banned); 
    });

    


  }
  async pay(productName: string, productPrice: number): Promise<void> {

    const transaction = {
      amountTransaction: productPrice * 100,
      "feedbacks": [],
      "articles":this.articleList,
      "users":null ,
      
    "housing":null
            
    };
    const transactionString = JSON.stringify(transaction);

    sessionStorage.setItem("transaction", transactionString);


    // Création de l'objet payment
    const payment = {
      name: "bureau",
      currency: 'usd',
      amount: productPrice * 100, // convertir dollars en cents
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // Appel de l'API backend pour démarrer le processus de paiement
    this.paiementService.processPayment(payment).subscribe((data: any) => {
      stripe?.redirectToCheckout({
        
        sessionId: data.id,
      }).then((result: any) => {
        // Vérifier si la redirection est un succès ou non
        if (result.error) {
          alert('Erreur lors de la redirection :'+ result.error.message);
          
        } else {
      sessionStorage.setItem("transaction","true" );
        }
      });
    });
}

}