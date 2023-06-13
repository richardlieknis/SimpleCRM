import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  isLoading: boolean = false;
  private userCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
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
