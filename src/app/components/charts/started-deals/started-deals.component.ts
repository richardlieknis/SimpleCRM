import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ChartConfiguration, ChartOptions } from 'chart.js'
import { from } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-started-deals',
  templateUrl: './started-deals.component.html',
  styleUrls: ['./started-deals.component.scss']
})
export class StartedDealsComponent implements OnInit {
  userNames: Array<string> = [];
  userSales: number[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };
  public barChartLabels = this.userNames;
  public barChartData = [{ data: this.userSales }]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllNamesWithSales();
  }

  getAllNamesWithSales() {
    const userData = this.userService.getDoc();
    userData.subscribe((data) => {
      data.forEach(user => {
        if (user['deals'] != null) {
          let fullName = user['firstName'] + " " + user['lastName'];
          this.userNames.push(fullName);
          this.userSales.push(user['deals']);
        }
      });
      this.setChartData();

    })
  }

  setChartData() {
    this.barChartLabels = this.userNames;
    this.barChartData = [{ data: this.userSales }]
  }
}
