import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  userId: string = '';
  user = new User();
  private userCollection: CollectionReference<DocumentData>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
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

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, {restoreFocus: false});

  //   // Manually restore focus to the menu trigger since the element that
  //   // opens the dialog won't be in the DOM any more when the dialog closes.
  //   dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  // }
}
