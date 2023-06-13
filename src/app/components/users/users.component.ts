import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CollectionReference, DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string = "";
  user = new User();
  allUsers: any = [];
  allIds: any = [];

  private userCollection: CollectionReference<DocumentData>;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
    collectionData(this.userCollection, { idField: 'id' })
      .subscribe((data: any) => {
        this.allUsers = [];
        data.forEach((user: any) => {
          this.allUsers.push(user)
          this.allIds.push(user['id']);
        });
      })
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent, {});
  }
}
