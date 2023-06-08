import { Component } from '@angular/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent {
  public barChartOptions = {
    scaleShowVericalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [12, 13, 14, 15], label: 'Series A' },
    { data: [17, 20, 4, 15], label: 'Series B' },
  ]
}
