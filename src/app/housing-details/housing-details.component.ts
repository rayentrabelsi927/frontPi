import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Housing } from '../models/Housing';
import { transaction_ban } from '../models/transaction_ban';
import { loadStripe } from '@stripe/stripe-js';
import { TokenService } from '../services/token.service';
import { PaiementService } from '../services/paiement.service';
import { TransactionService } from '../services/transaction.service';

const environment = {
  production: false,
  stripe: 'pk_test_51Oz6fDRqZpxfJakaVhNnthrrrLDDvwGzM9ob8vPtIknT9zSQZCKAVxwAmlsKAKtKpgjlvNvy69DYhnKmIRwEYqAG004YSQ4ePE', // Remplacez par votre clé publique Stripe
  serverUrl: '/api',
};
@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.css']
})
export class HousingDetailsComponent implements OnInit {


  possible: transaction_ban | undefined ;

  stripePromise = loadStripe(environment.stripe);
  productName: string = 'housing';
  productPrice: number = 50;

  /*userconnnecté:any={
    "userId": 1,
    "username": "rayen"};*/

userId!:any;
  
  housingId!: number;
  id!: number;
  housing: any; // Changer le type de housing en 'any' pour l'instant
  searchValue: string = '';
  mapUrl: SafeResourceUrl = '';

  availabilityTimeSlots: any[] = []; // Ajoutez la propriété availabilityTimeSlots
  add: any;
  addhcousing: any;

  constructor(

    private paiementService: PaiementService,private transactionservice : TransactionService,
    private usertoken :TokenService,
    private Act: ActivatedRoute,
    private housingService: HousingService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private http: HttpClient // Injectez le service HttpClient
  ) {}

 


  ngOnInit() {
    this.id = this.Act.snapshot.params['id'];
    this.loadHousingDetails();

    this.userId=this.usertoken.currentUser();

    this.transactionservice.getByIdIfBnned(this.userId).subscribe(data => {
    this.possible = data as transaction_ban;
    console.log(this.possible.banned); 
  });
    // this.loadAvailabilityTimeSlots(); // Appelez la méthode pour charger les créneaux horaires disponibles
  }

  async pay(productName: string, productPrice: number): Promise<void> {
    this.router.navigate(['housing-list/housing-byId', this.id])
      .then(() => {
        // Une fois la navigation réussie, vous pouvez récupérer le housing ici
        const housingId = this.id;
        this.housingService.getHousingById(housingId).subscribe(
          async (housing: Housing) => {
            console.log('Housing returned:', housing);




            this.housingService.getHousingById(housingId).subscribe(
              async (housing: Housing) => {
                console.log('Housing returned:', housing);
                this.addhcousing={
                  
                    "housingID": housing.housingID,
                    "typeHousing": housing.typeHousing,
                    "descriptionHousing": housing.descriptionHousing,
                    "locationHousing": housing.locationHousing,
                    "availabilityHousing": housing.availabilityHousing,
                    
                    "priceHousing": housing.priceHousing
                    
                
        
                };
        

                const transaction = {
                  amountTransaction: housing.priceHousing,
                  "feedbacks": [],
                  "articles":[],
                  "users":{"userId":this.userId} ,
                  
                "housing":this.addhcousing
                        
                };
                const transactionString = JSON.stringify(transaction);
            
                sessionStorage.setItem("transaction", transactionString);
            
            
                // Création de l'objet payment
                const payment = {
                  name: "Housing",
                  currency: 'usd',
                  amount:  housing.priceHousing*100, // convertir dollars en cents
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
              },
              error => {
                console.error('Error fetching housing:', error);
              }
            );
          





          },
          error => {
            console.error('Error fetching housing:', error);
          }
        );
      })
      .catch(error => {
        console.error('Navigation failed:', error);
      });

  
}
  
 

  navigateToListTimeSlot(): void {
    this.router.navigate(['housing-ATSdispo', this.id]);
  }
  navigateToListVisit(): void {
    this.router.navigate(['housing-visit-list', this.id]);
  }
  navigateToTransaction(): void {
    this.router.navigate(['housing-list/housing-byId', this.id])
      .then(() => {
        // Une fois la navigation réussie, vous pouvez récupérer le housing ici
        const housingId = this.id;
        this.housingService.getHousingById(housingId).subscribe(
          (housing: Housing) => {
            console.log('Housing returned:', housing);
          },
          error => {
            console.error('Error fetching housing:', error);
          }
        );
      })
      .catch(error => {
        console.error('Navigation failed:', error);
      });
  }
  
  updateMapUrl(location: string) {
    const encodedValue = encodeURIComponent(location.trim());
    const url = `https://maps.google.com/maps?q=${encodedValue}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loadHousingDetails() {
    const housingId: number = this.Act.snapshot.params['id'];

    if (!isNaN(housingId)) {
      this.housingService.getHousingById(housingId).subscribe((data: any) => {
        this.housing = data;
        console.log(this.housing.images[0])
        this.updateMapUrl(this.housing.locationHousing);
      });
    } else {
      console.error("Invalid housing ID");
    }
  }

 
}
