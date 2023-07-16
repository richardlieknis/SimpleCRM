import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { AnyObject } from 'chart.js/types/basic';
import { RevenueService } from 'src/app/shared/services/revenue.service';
import { Revenue } from 'src/models/revenue.class';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  deal!: Deal;
  runningDealIds: string[] = [];
  doneDealIds: string[] = [];
  runningDeals: AnyObject[] = [];
  doneDeals: AnyObject[] = [];
  r = new Revenue();

  constructor(
    public dialog: MatDialog,
    private dealService: DealService,
  ) {
  }

  ngOnInit(): void {
    this.dealService.returnAllDocs().subscribe((data: any) => {
      this.runningDealIds = [];
      data.forEach((deal: AnyObject) => {
        if (deal['isDone'] === false){
          this.runningDeals.push(deal);
          this.runningDealIds.push(deal['id'] as string);
        }
      });
    });
    this.dealService.returnAllDocs().subscribe((data: any) => {
      this.doneDealIds = [];
      data.forEach((deal: AnyObject) => {
        if (deal['isDone'] === true){
          this.doneDeals.push(deal);
          this.doneDealIds.push(deal['id'] as string);
        }
      });
    });
  }

  openDialog() {
    this.dialog.open(DialogAddDealComponent)
  }
}
