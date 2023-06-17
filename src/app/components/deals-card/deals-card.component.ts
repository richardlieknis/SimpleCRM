import { Component, OnInit } from '@angular/core';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';

@Component({
  selector: 'app-deals-card',
  templateUrl: './deals-card.component.html',
  styleUrls: ['./deals-card.component.scss']
})
export class DealsCardComponent implements OnInit {
  deal!: Deal;

  constructor(
    public dealService: DealService,
  ) { }

  ngOnInit(): void {
    this.getAllDeals();
  }

  getAllDeals() {
    let test = this.dealService.getDoc()
      .subscribe(deals => {
        // console.log(deals[0]);
      });
  }
}
