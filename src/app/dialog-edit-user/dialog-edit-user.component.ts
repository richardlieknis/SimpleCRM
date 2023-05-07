import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export default class DialogEditUserComponent {
 user = new User();
  birthDate!: Date;
  isLoading: boolean = false;
  private userCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.userCollection = collection(this.firestore, 'users');
  }

  closeDialog(): void{
    this.dialogRef.close();
   }
  

  save() {
    this.isLoading = true;
    let dateInMilliseconds = this.birthDate.getTime();
    const formattedDate = new Date(dateInMilliseconds).toLocaleDateString("de-DE");

    this.user.birthDate = formattedDate;

    addDoc((this.userCollection), this.user.toJSON())
      .then((result: any) => {
        this.isLoading = false;
        this.closeDialog();
      });
  }
}
