import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/models/user.class';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})

export class DialogAddUserComponent implements OnInit {
  userForm!: FormGroup;
  user = new User();
  birthDate!: Date;
  isLoading: boolean = false;
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.userCollection = collection(this.firestore, 'users');
    this.dateAdapter.setLocale('de-DE');
  }

  ngOnInit(): void {
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

  closeDialog(): void {
    this.dialogRef.close();
  }


  save() {
    this.isLoading = true;
    const dateInMilliseconds = this.birthDate.getTime();
    const formattedDate = new Date(dateInMilliseconds).toLocaleDateString("de-DE");
    this.user.birthDate = formattedDate;
    this.userService.setNewUserDoc(this.user);
    this.closeDialog();
  }
}
