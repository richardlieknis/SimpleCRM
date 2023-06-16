import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private dealColl: CollectionReference<DocumentData>

  constructor(
    private firestore: Firestore,
    private userService: UserService,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.dealColl);
  }
}
