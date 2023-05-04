import { Component } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

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
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: {name: this.user.firstName},
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  
}
