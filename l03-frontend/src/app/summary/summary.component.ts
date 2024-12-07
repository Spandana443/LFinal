import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-summary',
  standalone: true, // Mark this as standalone
  imports: [TopMenuComponent], // Import the TopMenuComponent
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summaryText: string = ''; // Text summary
  chartData: any = {}; // Chart data to be fetched from the backend

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSummary(); // Load the summary text
    this.fetchChartData(); // Fetch and render chart data
  }

  // Fetch Summary Text
  fetchSummary() {
    this.summaryText = `
      Generative AI has seen incredible advancements in the past six months.
      Key innovations include more efficient transformer architectures, the emergence of GPT-4, and groundbreaking advancements in text-to-image systems such as DALL·E and Stable Diffusion.
      These technologies are reshaping fields like content creation, healthcare, and design with their generative capabilities.
    `;
  }

  // Fetch Chart Data from the Backend
  fetchChartData() {
    const token = localStorage.getItem('token'); // Ensure the token is correctly retrieved
    if (!token) {
      console.error('JWT token is missing!');
      return;
    }

    this.http.get('http://localhost:3000/api/summary-chart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data: any) => {
        console.log('Chart Data:', data); // Log data for debugging
        this.chartData = data;
        this.renderChart(); // Render the chart with fetched data
      },
      error: (err) => {
        console.error('Failed to fetch chart data:', err);
      }
    });
  }


  // Render Chart Using Chart.js
  renderChart() {
    if (this.chartData && this.chartData.labels && this.chartData.values) {
      new Chart('summaryChart', {
        type: 'bar',
        data: {
          labels: this.chartData.labels,
          datasets: [
            {
              label: 'Generative AI Progress',
              data: this.chartData.values, // Ensure the key matches your API
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
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
                text: 'Models'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Performance'
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
