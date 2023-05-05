import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  username: string = "";
  user = new User();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
      this.dialog.open(DialogAddUserComponent, {});
  }
}
