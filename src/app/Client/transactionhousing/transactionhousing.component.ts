import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { transaction_ban } from 'src/app/models/transaction_ban';
import { PaiementService } from 'src/app/services/paiement.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
const environment = {
  production: false,
  stripe: 'pk_test_51Oz6fDRqZpxfJakaVhNnthrrrLDDvwGzM9ob8vPtIknT9zSQZCKAVxwAmlsKAKtKpgjlvNvy69DYhnKmIRwEYqAG004YSQ4ePE', // Remplacez par votre clé publique Stripe
  serverUrl: '/api',
};
@Component({
  selector: 'app-transactionhousing',
  templateUrl: './transactionhousing.component.html',
  styleUrls: ['./transactionhousing.component.css']
})
export class TransactionhousingComponent {
  possible: transaction_ban | undefined ;

  stripePromise = loadStripe(environment.stripe);
  productName: string = 'Iphone X';
  /*userconnnecté:any={
    "userId": 1,
    "username": "rayen"};*/

userId!:any;

  productPrice: number = 50;
  articleList: any[] =  [{"articleId":7,"categoryArticle":"Technology","conditionArticle":"Fair","descriptionArticle":"123"}];

constructor(private paiementService: PaiementService,private transactionservice : TransactionService,private router: Router,private usertoken :TokenService) { }

  ngOnInit(): void {
    
    this.userId=this.usertoken.currentUser();

      this.transactionservice.getByIdIfBnned(this.userId).subscribe(data => {
      this.possible = data as transaction_ban;
      console.log(this.possible.banned); 
    });

    


  }
  async pay(productName: string, productPrice: number): Promise<void> {

    const transaction = {
      amountTransaction: productPrice * 100,
      "feedbacks": [],
      "articles":[],
      "users":{"userId":this.userId} ,
      
    "housing":{
      "housingID": 1,
      "typeHousing": "Shared",
      "descriptionHousing": "ssdd",
      "locationHousing": "Ennaser1,Tunis,Tunisie",
      "availabilityHousing": true,
      "images": [],
      "priceHousing": null,
      "owner": null
  }
            
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