import { Component, Inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export default class DialogEditUserComponent {
  user = new User();
  userId: string = '';
  birthDate!: Date;
  isLoading: boolean = false;
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userCollection = collection(this.firestore, 'users');
  }

  closeDialog(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.setUserData(this.data);
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
      console.log(this.formatDate(user.birthDate));
    })
  }
  

  save() {
    this.isLoading = true;
    let dateInMilliseconds = 0;
    try {dateInMilliseconds = this.birthDate.getTime();} catch {}

    const formattedDate = new Date(dateInMilliseconds).toLocaleDateString("de-DE");

    this.user.birthDate = formattedDate;

    const docRef = doc(this.userCollection, this.data);
    setDoc(docRef, this.user.toJSON())
      .then((result) => {
        this.isLoading = false;
        this.closeDialog();
      });
  }

  formatDate(milliseconds: number) {
  const date = new Date(milliseconds);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Monat (von 0 bis 11)
  const day = date.getDate().toString().padStart(2, '0');  // Tag
  const year = date.getFullYear().toString();  // Jahr

  return `${month}/${day}/${year}`;
}
}
