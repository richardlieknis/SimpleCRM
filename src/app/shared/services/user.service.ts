import { Injectable, OnInit } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

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
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.userColl);
  }
}
