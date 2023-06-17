import { Injectable, OnInit } from '@angular/core';
import { FieldValue, collectionData, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
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

  /** Nicht in benutzung */
  getUserDeals(userId: string) {
    const docRef = doc(this.userColl, userId);
    const userData = docData(docRef);
    userData.subscribe(user => {
      console.log(user);
      console.log(user['deals']);
      return user['deals'];
    })
  }

  setNewUserDoc(user: any) {
    this.user = user;
    this.user.id = this.generateRandomString(20);
    setDoc(doc(this.userColl, this.user.id), this.user.toJSON())
      .then(() => {
        return true;
      });
  }


  countUpDeals(userId: string) {
    this.getUserDeals(userId);
    const docRef = doc(this.firestore, 'users', userId);
    updateDoc(docRef, {
      deals: 0
    })
  }


  /** SetUserData nur zu Testzwecken
   */
  setUserData(userId: string) {
    const docRef = doc(this.userColl, userId);
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
