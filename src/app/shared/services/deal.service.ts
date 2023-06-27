import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, FieldValue, Firestore, addDoc, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Deal } from 'src/models/deal.class';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private deal = new Deal();
  private dealColl: CollectionReference<DocumentData>;
  allIds: any[] = [];

  constructor(
    private firestore: Firestore,
    private userService: UserService,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.dealColl);
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

  setDealData(userId: string) {

  }


}
