import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { AnyObject } from 'chart.js/types/basic';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  deal!: Deal;
  runningDealIds: any = [];
  doneDealIds: any = [];
  runningDeals: any = [];
  doneDeals: any = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dealService: DealService
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.returnRunningDeals();
    await this.returnDoneDeals();
  }

  async returnRunningDeals() {
    this.runningDealIds = [];
    this.dealService.returnAllDocs().pipe(take(1)).subscribe((data: any) => {
      data.forEach((deal: AnyObject) => {
        if (deal['isDone'] === false){
          this.runningDeals.push(deal);
          this.runningDealIds.push(deal['id']);
        }
      });
    });
  }

  async returnDoneDeals() {
    this.doneDealIds = [];
    this.dealService.returnAllDocs().pipe(take(1)).subscribe((data: any) => {
      data.forEach((deal: AnyObject) => {
        if (deal['isDone'] === true){
          this.doneDeals.push(deal);
          this.doneDealIds.push(deal['id']);
        }
      });
    });
  }

  openDialog() {
    console.log(this.doneDealIds);
    this.dialog.open(DialogAddDealComponent)
  }
}
