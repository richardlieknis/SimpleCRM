import { Injectable, OnInit } from '@angular/core';
import { FieldValue, collectionData, doc, docData, docSnapshots, setDoc, updateDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  user = new User();
  private userColl: CollectionReference<DocumentData>;
  private selectedUserDeals: any;
  fieldValuePromise: any;

  constructor(
    public firestore: Firestore,
  ) {
    this.userColl = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.userColl);
  }

  getUserDeals(userId: string) {
    const docRef = doc(this.userColl, userId);
    this.fieldValuePromise = new Promise((resolve, reject) => {
      docSnapshots(docRef).subscribe(snapshot => {
        const fieldValue = snapshot.get('deals');
        resolve(fieldValue);
      });
    });
  }
 
  countUpDeals(userId: string) {
    const docRef = doc(this.firestore, 'users', userId);
    this.getUserDeals(userId);
    this.fieldValuePromise.then((fieldValue: any) => {
      updateDoc(docRef, {
        deals: fieldValue + 1
      });
    });
  }

  setNewUserDoc(user: any) {
    this.user = user;
    this.user.id = this.generateRandomString(20);
    setDoc(doc(this.userColl, this.user.id), this.user.toJSON())
      .then(() => {
        return true;
      });
  }

  generateRandomString(length: number) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

}
