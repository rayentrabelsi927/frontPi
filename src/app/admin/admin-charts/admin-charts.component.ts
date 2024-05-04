import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AdminchartsService } from 'src/app/services/admincharts.service';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {

  constructor(private chartService: AdminchartsService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createPieChart();
    this.createStackedBarChart();
    this.createBarChart();
  }

  createPieChart(): void {
    this.chartService.getCountByCondition().subscribe((data: any[]) => {
      const labels = data.map((item: any) => item[0]);
      const counts = data.map((item: any) => item[1]);
      const total = counts.reduce((a, b) => a + b, 0);
      const percentages = counts.map(count => ((count / total) * 100).toFixed(2)).map(Number);


      const config: ChartConfiguration<'pie', number[], string> = {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: '',
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      };

      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, config);
      } else {
        console.error('Impossible de trouver le canvas');
      }
    });
  }

  createStackedBarChart(): void {
    this.chartService.getCountByCategoryAndCondition().subscribe((data: any[]) => {
      const categories = Array.from(new Set(data.map((item: any) => item[0])));
      const conditions = Array.from(new Set(data.map((item: any) => item[1])));
      const counts = data.reduce((acc: any[], curr: any) => {
        const categoryIndex = categories.indexOf(curr[0]);
        const conditionIndex = conditions.indexOf(curr[1]);
        if (!acc[categoryIndex]) {
          acc[categoryIndex] = Array(conditions.length).fill(0);
        }
        acc[categoryIndex][conditionIndex] = curr[2];
        return acc;
      }, []);

      const config: ChartConfiguration<'bar', number[], string> = {
        type: 'bar',
        data: {
          labels: categories,
          datasets: conditions.map((condition: any, index: number) => ({
            label: condition,
            data: counts.map((item: any) => item[index]),
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
          }))
        },
        options: {
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      };

      const ctx = document.getElementById('stackedBarChart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, config);
      } else {
        console.error('Impossible de trouver le canvas');
      }
    });
  }

  createBarChart(): void {
    this.chartService.getCategoriesCount().subscribe((data: any[]) => {
      const labels = data.map((item: any) => item[0]);
      const counts = data.map((item: any) => item[1]);
      const config: ChartConfiguration<'bar', number[], string> = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Articles',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      };

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, config);
      } else {
        console.error('Impossible de trouver le canvas');
      }
    });
  }
}