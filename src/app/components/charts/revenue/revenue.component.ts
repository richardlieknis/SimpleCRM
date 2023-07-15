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
  extractRevenueData: Array<any> = [];
  revenueLabels: Array<any> = [];

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
    const chartData = await this.revenueService.getDocs();
    chartData.forEach((doc) => {
      this.allRevenueYears.push(doc.id);
      this.allRevenueData.push(doc.data());
    })
    this.sortRevenueData();
  }

  sortRevenueData() {
    const sortOrder = this.revenueService.months;
    const sortedObj: any = {};
    for (let i = 0; i < this.allRevenueData.length; i++) {
      sortOrder.forEach(key => {
        if (this.allRevenueData[i].hasOwnProperty(key)) {
          sortedObj[key] = this.allRevenueData[i][key];
        }
      });
      this.setObjectData(sortedObj, this.allRevenueYears[i]);
    }
    this.setChartData(this.extractRevenueData);
  }

  setObjectData(data: any, year: string) {
    const entries = Object.entries(data);
    this.revenueLabels = entries.map(([key, value]) => key);
    let chData: Array<any> = entries.map(([key, value]) => value);

    this.extractRevenueData.push(this.setDataObj(chData, year));
  }

  setChartData(data: any) {
    this.chartLabels = this.revenueLabels;
    this.chartData = [...data]
  }

  setDataObj(data: any, label: any) {
    return {
      data: data,
      label: label
    }
  }
}