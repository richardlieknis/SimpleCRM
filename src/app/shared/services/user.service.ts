import { Injectable, OnInit } from '@angular/core';
import { collectionData, doc, setDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  user = new User();
  private userColl: CollectionReference<DocumentData>

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
