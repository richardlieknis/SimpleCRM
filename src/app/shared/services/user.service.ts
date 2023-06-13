import { Injectable, OnInit } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private userColl: CollectionReference<DocumentData>

  constructor(
    public firestore: Firestore,
  ) {
    this.userColl = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
    this.getDoc();
  }

  getDoc() {
    collectionData(this.userColl, { idField: 'id' })
      .subscribe((data) => {
        console.log("DATA: ", data);
      })
  }
}
