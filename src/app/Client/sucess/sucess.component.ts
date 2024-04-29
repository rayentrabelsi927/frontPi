import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from 'src/app/services/transaction.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnInit {
  errorMessage: any;
  



  constructor(private transactionservice: TransactionService , private route: ActivatedRoute,private cookieService: CookieService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.savetransaction();

  }
 
  savetransaction(){
    
    const objetStocke = sessionStorage.getItem('transaction');

    if (objetStocke !== null) {
      const objetDecodé = JSON.parse(objetStocke);
      console.log(objetDecodé);
     // const t = new Transaction(objetDecodé.transactionId,  objetDecodé.amountTransaction,objetDecodé.payementDateTransaction, objetDecodé.feedbacks, objetDecodé.articles)
    
      const a = {
        amountTransaction: 1000.0,
        payementDateTransaction: "2024-04-15T19:53:42",
        feedbacks: [],
        articles: [
      
          {
              "articleId": 4,
              "categoryArticle": "Educational",
              "conditionArticle": "Damaged",
              "imgArticle": "img",
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": {
                  "userId": 1,
                  "username": "rayen",
                  "firstName": "rayen",
                  "lastName": "test",
                  "email": "test@test.com",
                  "password": "test",
                  "phone": 0,
                  "role": "admin",
                  "imgUser": "test",
                  "lastLogin": "test",
                  "complaints": [],
                  "internships": null,
                  "participants": [],
                  "sportTeams": null,
                  "jobs": []
              }
          },
          {
              "articleId": 6,
              "categoryArticle": "Educational",
              "conditionArticle": null,
              "imgArticle": null,
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": null
          },
          {
              "articleId": 8,
              "categoryArticle": "Technology",
              "conditionArticle": null,
              "imgArticle": null,
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": null
          },
          {
              "articleId": 9,
              "categoryArticle": "Technology",
              "conditionArticle": null,
              "imgArticle": null,
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": null
          },
          {
              "articleId": 10,
              "categoryArticle": "Home",
              "conditionArticle": "Good",
              "imgArticle": "img",
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": {
                  "userId": 1,
                  "username": "rayen",
                  "firstName": "rayen",
                  "lastName": "test",
                  "email": "test@test.com",
                  "password": "test",
                  "phone": 0,
                  "role": "admin",
                  "imgUser": "test",
                  "lastLogin": "test",
                  "complaints": [],
                  "internships": null,
                  "participants": [],
                  "sportTeams": null,
                  "jobs": []
              }
          },
          {
              "articleId": 11,
              "categoryArticle": "Home",
              "conditionArticle": "Good",
              "imgArticle": "img",
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": {
                  "userId": 1,
                  "username": "rayen",
                  "firstName": "rayen",
                  "lastName": "test",
                  "email": "test@test.com",
                  "password": "test",
                  "phone": 0,
                  "role": "admin",
                  "imgUser": "test",
                  "lastLogin": "test",
                  "complaints": [],
                  "internships": null,
                  "participants": [],
                  "sportTeams": null,
                  "jobs": []
              }
          },
          {
              "articleId": 12,
              "categoryArticle": "Home",
              "conditionArticle": "Good",
              "imgArticle": "img",
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": {
                  "userId": 1,
                  "username": "rayen",
                  "firstName": "rayen",
                  "lastName": "test",
                  "email": "test@test.com",
                  "password": "test",
                  "phone": 0,
                  "role": "admin",
                  "imgUser": "test",
                  "lastLogin": "test",
                  "complaints": [],
                  "internships": null,
                  "participants": [],
                  "sportTeams": null,
                  "jobs": []
              }
          },
          {
              "articleId": 13,
              "categoryArticle": "Home",
              "conditionArticle": "Good",
              "imgArticle": "img",
              "descriptionArticle": "Description de l'article",
              "priceArticle": 500.0,
              "users": {
                  "userId": 1,
                  "username": "rayen",
                  "firstName": "rayen",
                  "lastName": "test",
                  "email": "test@test.com",
                  "password": "test",
                  "phone": 0,
                  "role": "admin",
                  "imgUser": "test",
                  "lastLogin": "test",
                  "complaints": [],
                  "internships": null,
                  "participants": [],
                  "sportTeams": null,
                  "jobs": []
              }
          }
      ],
        housing: null,
          "users": {
          "userId": 1,
          "username": "rayen",
          "firstName": "rayen",
          "lastName": "test",
          "email": "test@test.com",
          "password": "test",
          "phone": 0,
          "role": "admin",
          "imgUser": "test",
          "lastLogin": "test",
          "complaints": [],
          "internships": null,
          "participants": [],
          "sportTeams": null,
          "jobs": []
      }
    };


      this.transactionservice.addTransaction2(a)
      .subscribe(
        (response) => {
          console.log('Transaction ajoutée avec succès :', response);
          sessionStorage.removeItem("transaction");


        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la transaction :', error);
          // Traitez l'erreur ici, par exemple affichez un message à l'utilisateur
        }
      );
      

     /* this.transactionservice.addTransaction(t).subscribe(
        data => {
         
console.log(data.transactionId) ;

         sessionStorage.removeItem("transaction");

        },
        err => {
          this.errorMessage = err.error.message;
        }
      );*/
    } else {
      console.error('Aucun objet trouvé dans sessionStorage pour la clé spécifiée.');
    }

    
      
     
    

  }
 
}
