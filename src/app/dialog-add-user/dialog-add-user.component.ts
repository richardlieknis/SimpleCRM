import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
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
  private userCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'users');
  }

  cancelDialog(): void{ }
  

  save() {
    this.user.birthDate = this.birthDate.getTime();

    addDoc((this.userCollection), this.user.toJSON());
  }
}
