import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  deal!: Deal;
  runningDealIds: any[] = [];
  doneDealIds: any[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dealService: DealService
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.returnRunningDeals();
    this.returnDoneDeals();
  }

  returnRunningDeals() {
    this.runningDealIds = [];
    this.runningDealIds = this.dealService.returnAllDocIds(true);
  }

  async returnDoneDeals() {
    this.doneDealIds = [];
    this.doneDealIds = this.dealService.returnAllDocIds(false);
  }
  openDialog() {
    this.dialog.open(DialogAddDealComponent)
  }
}
