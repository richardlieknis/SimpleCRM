import { Component, Inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
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
  userForm!: FormGroup;
  user = new User();
  userId: string = '';
  birthDate!: Date;
  isLoading: boolean = false;
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.userCollection = collection(this.firestore, 'users');
    this.dateAdapter.setLocale('de-DE');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.setUserData(this.data);
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    })
  }

  setUserData(userId: string) {
    const docRef = doc(this.userCollection, userId);
    const userData = docData(docRef);
    userData.subscribe((user: any) => {
      this.user.id = user.id;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.birthDate = user.birthDate;
      this.user.street = user.street;
      this.user.city = user.city;
      this.user.zipCode = user.zipCode;
      this.user.deals = user.deals;
      this.user.dealSales = user.dealSales;
      this.user.photoURL = user.photoURL;
    })
  }


  save() {
    this.isLoading = true;
    const dateInMilliseconds = this.birthDate.getTime();
    const formattedDate = new Date(dateInMilliseconds).toLocaleDateString("de-DE");
    this.user.birthDate = formattedDate;
    const docRef = doc(this.userCollection, this.data);

    setDoc(docRef, this.user.toJSON())
      .then(() => {
        this.closeDialog();
        this.isLoading = false;
      });
  }
}
