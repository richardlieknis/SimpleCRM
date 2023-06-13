import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatMenuTrigger } from '@angular/material/menu';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  userId: string = '';
  user = new User();
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
    ) {
    this.userCollection = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.setUserData(this.userId);
    })
  }

  setUserData(userId: string) {
    const docRef = doc(this.userCollection, userId);
    const userData = docData(docRef);
    userData.subscribe((user: any) => {
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.birthDate = user.birthDate;
      this.user.street = user.street;
      this.user.city = user.city;
      this.user.zipCode = user.zipCode;
    })
  }

  editUser() {
    // console.log(this.userId);
    this.dialog.open(DialogEditUserComponent, {
      data: this.userId
    });
    
  }
}
