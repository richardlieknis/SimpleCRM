import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, FieldValue, Firestore, addDoc, arrayUnion, collection, collectionData, doc, docData, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Deal } from 'src/models/deal.class';
import { get } from '@angular/fire/database';
import { AsyncPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private deal = new Deal();
  private dealColl: CollectionReference<DocumentData>;
  private revenueColl: CollectionReference<DocumentData>;
  allIds: any[] = [];

  constructor(
    private firestore: Firestore,
    private userService: UserService,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
    this.revenueColl = collection(this.firestore, 'revenue');
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.dealColl);
  }

  getRevenues(): Observable<DocumentData[]> {
    return collectionData(this.revenueColl);
  }

  createNewDeal(userId: string, userEmail: string, deal: any) {
    this.deal = deal;
    this.deal.email = userEmail;
    this.userService.countUpDeals(userId);
    setDoc(doc(this.dealColl), this.deal.toJSON());
  }

  returnAllDocs() {
    return collectionData(this.dealColl, { idField: 'id' })
  }

  getCurrentMonth() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let currentMonth = new Date().getUTCMonth();
    return (months[currentMonth]);
  }


}
