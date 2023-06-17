import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  deal!: Deal;
  allDealIds: any[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private dealService: DealService,
  ) { }

  ngOnInit(): void {
    this.allDealIds = [];
    this.allDealIds = this.dealService.returnAllDocIds();
  }

  openDialog() {
    this.dialog.open(DialogAddDealComponent)
    console.log(this.allDealIds[0]);
  }

}
