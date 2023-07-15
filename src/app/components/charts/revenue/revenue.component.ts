import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { Observable } from 'rxjs';
import { RevenueService } from 'src/app/shared/services/revenue.service';


@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  allRevenueYears: Array<any> = [];
  allRevenueData: Array<any> = [];

  public chartLabels!: any;
  public chartData!: any;
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return value + '€';
          }
        }
      }
    }
  };

  constructor(
    private revenueService: RevenueService,
  ) { }

  async ngOnInit(): Promise<void> {
    const sortOrder = this.revenueService.months;
    const chartData = await this.revenueService.getDocs();
    chartData.forEach((doc) => {
      this.allRevenueYears.push(doc.id);
      this.allRevenueData.push(doc.data());
    })
    
    const sortedObj: any = {};
    sortOrder.forEach(key => {
      if (this.allRevenueData[0].hasOwnProperty(key)){
        sortedObj[key] = this.allRevenueData[0][key];
      }
    });

    console.log("SORT: ",sortedObj);

    this.setChartData(sortedObj);
  }

  setChartData(data: any) {
    const entries = Object.entries(data);
    let labels: Array<any> = entries.map(([key, value]) => key);
    let chData: Array<any> = entries.map(([key, value]) => value);
    

    console.log(labels, chData);
    
    this.chartLabels = labels;

    this.chartData = [
      {
        data: chData,
        label: this.allRevenueYears[0],
      },
    ]
  }
}
