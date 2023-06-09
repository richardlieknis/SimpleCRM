import { Component } from '@angular/core';

@Component({
  selector: 'app-started-deals',
  templateUrl: './started-deals.component.html',
  styleUrls: ['./started-deals.component.scss']
})
export class StartedDealsComponent {
  public barChartOptions = {
    scaleShowVericalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  public barChartData = [
    {
      data: [75432, 94312, 61243, 89456, 43209, 76321, 90123, 65321, 56432, 80234, 92874, 67543],
      label: '2020'
    },
    {
      data: [89341, 65423, 80235, 98654, 53210, 71987, 60432, 81234, 96432, 87123, 74561, 52019],
      label: '2021'
    },
    {
      data: [67890, 93456, 51842, 70012, 83124, 92017, 57643, 82456, 96021, 70345, 81903, 65340],
      label: '2022'
    },
  ]
}
