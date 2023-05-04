import { Component } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  username: string = "";

  constructor(public dialog: MatDialog) {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: {name: this.username},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  
}
