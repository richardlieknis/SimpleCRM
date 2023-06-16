import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';
import { DialogAddDealComponent } from '../dialog-add-deal/dialog-add-deal.component';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent {

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  openDialog() {
    this.dialog.open(DialogAddDealComponent)
  }
}
