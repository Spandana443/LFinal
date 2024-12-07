import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-reports',
  standalone: true, // Mark this as standalone
  imports: [TopMenuComponent], // Import the TopMenuComponent
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportText: string = '';
  chartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReport();
    this.fetchChartData();
  }

  fetchReport() {
    this.reportText = `Generative AI has also expanded its applications beyond traditional use cases.
    Recent breakthroughs include advancements in code generation, personalized AI assistants, and ethical AI governance.
    This report visualizes key metrics related to Generative AI development.`;
  }

  fetchChartData() {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error('JWT token is missing!');
      return;
    }

    this.http.get('http://localhost:3000/api/reports-chart', {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      }
    }).subscribe({
      next: (data: any) => {
        this.chartData = data;
        this.renderChart();
      },
      error: (err) => {
        console.error('Failed to fetch chart data:', err);
      }
    });
  }

  renderChart() {
    if (this.chartData && this.chartData.labels && this.chartData.values) {
      new Chart('reportsChart', {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: [
            {
              label: 'Generative AI Developments',
              data: this.chartData.values, // Updated to use `values` instead of `data`
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Developments'
              }
            }
          }
        }
      });
    } else {
      console.error('Chart data is incomplete or invalid.');
    }
  }
}

