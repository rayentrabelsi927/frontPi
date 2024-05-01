import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Chart, registerables } from 'chart.js';
import { statisticstransaction } from 'src/app/models/statisticsTransaction';
import { statisticsFeedback } from 'src/app/models/statisticsFeedback';

@Component({
  selector: 'app-statistic-feedback',
  templateUrl: './statistic-feedback.component.html',
  styleUrls: ['./statistic-feedback.component.css']
})
export class StatisticFeedbackComponent implements OnInit {
  public myAngularxQrCode: string = "";
  stat: any; // Initialisation du tableau de feedback
  statTransaction: any;
  constructor(private transactionService: TransactionService,  private router: Router) {
    this.myAngularxQrCode = 'Your QR code data string';

    Chart.register(...registerables);

   }

  ngOnInit(): void {
this.statisticstransaction();
    this.statisticsfeedback();
  }


  statisticsfeedback(){
    this.transactionService.stat().subscribe(data => {
      this.stat = data;
      console.log(this.stat)

      this.tt(this.stat);

 // Affiche data complet dans la console
    });

  }


  statisticstransaction(){
    this.transactionService.stattransaction().subscribe(data => {
      this.statTransaction = data;
      console.log(this.statTransaction)

      this.tt2(this.statTransaction);

 // Affiche data complet dans la console
    });

  }


  tt(stat:statisticsFeedback) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available.');
      return;
    }


    
    const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
  
    labels: ['Très insatisfait', 'Insatisfait', ' Moyennement satisfait', 'Satisfait', 'Très satisfait'],
    datasets: [{
      label: 'feedback ',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        
      ],
      borderColor: 'rgb(255, 255, 255)', // Couleur de la bordure
      data: [stat.note1,stat.note2,stat.note3,stat.note4,stat.note5],
    }]
  },
  options: {}
});

  }



  tt2(stattransaction :statisticstransaction ) {
    const canvas = document.getElementById('myChart2') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available.');
      return;
    }
  
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],  
              datasets: [{
          label: 'Courbe de transaction',
          data: [
            stattransaction.janvier,
            stattransaction.fevrier,
            stattransaction.mars,
            stattransaction.avril,
            stattransaction.mai,
            stattransaction.juin,
            stattransaction.juillet,
            stattransaction.aout,
            stattransaction.septembre,
            stattransaction.octobre,
            stattransaction.novembre,
            stattransaction.decembre
          ]
          ,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 1
        }]
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1, // Définit l'intervalle entre chaque valeur de l'échelle y
            }
          }
        }
      } // Ajoutez vos options de graphique ici si nécessaire
    });
  }
 /* tt() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available.');
      return;
    }

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [this.stat.note1, this.stat.note2, this.stat.note3, this.stat.note3, this.stat.note4, this.stat.note5],
        }]
      },
      options: {}
    });
  }*/

}
