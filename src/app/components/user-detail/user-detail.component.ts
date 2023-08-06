import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatMenuTrigger } from '@angular/material/menu';
import DialogEditUserComponent from '../dialog-edit-user/dialog-edit-user.component';
import { update } from '@angular/fire/database';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  editPhoneToggle: boolean = false;
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
      this.user.phoneNumber = user.phoneNumber;
      this.user.deals = user.deals;
    })
  }

  submitPhoneNumber(value: any){
    const docRef = doc(this.userCollection, this.userId);
    updateDoc(docRef, {
      phoneNumber: value,
    });
    this.editPhoneToggle = false;
  }

  callUser(phone: any) {
    console.log("hallo?");
    window.location.href = `tel:${phone}`;
    // window.open(`tel:${phone}`);
  }

  mailUser(email: any) {
    window.location.href = `mailto:${email}`;
  }

  editUser() {
    // console.log(this.userId);
    this.dialog.open(DialogEditUserComponent, {
      data: this.userId
    });
    
  }
}
