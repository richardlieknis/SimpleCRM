import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { NgChartsConfiguration } from 'ng2-charts';

@Component({
  selector: 'app-sales-activity',
  templateUrl: './sales-activity.component.html',
  styleUrls: ['./sales-activity.component.scss']
})
export class SalesActivityComponent {
  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  public chartLabels = ["Call", "Preparation", "Email", "Lead research"];

  public chartData = [
    {
      data: [23, 11, 43, 70],
      label: '2020'
    },
    // {
    //   data: [89341, 65423, 80235, 98654, 53210],
    //   label: '2021'
    // },
    // {
    //   data: [67890, 93456, 51842, 70012, 83124],
    //   label: '2022'
    // },
  ]
}
