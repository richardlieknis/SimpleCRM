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
  allDeals: any[] = [];
  dealDataPromise: any;

  constructor(
    private firestore: Firestore,
    private userService: UserService,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
  }

  getDoc(): Observable<DocumentData[]> {
    return collectionData(this.dealColl);
  }

  createDoc(userId: string, userEmail: string, deal: any) {
    this.deal = deal;
    this.deal.email = userEmail;
    this.userService.countUpDeals(userId);
    setDoc(doc(this.dealColl), this.deal.toJSON());
  }

  returnAllDocIds() {
    this.allIds = [];
    collectionData(this.dealColl, { idField: 'id' })
      .subscribe((data) => {
        data.forEach(deal => {
          this.allIds.push(deal['id']);
        })
      })
    return this.allIds;
  }

  setDealData(userId: string) {
    const docRef = doc(this.dealColl, userId);
    const dealData = docData(docRef);
    this.dealDataPromise = new Promise((resolve) => {
      dealData.subscribe((deal: any) => {
        this.deal.dealName = deal['dealName'];
        this.deal.fullName = deal['fullName'];
        this.deal.email = deal['email'];
        this.deal.dealSale = deal['dealSale'];
        resolve(this.deal)
      });
    })

  }

  async returnDealData(userId: string) {
    this.setDealData(userId);
    console.log(this.dealDataPromise);
    this.dealDataPromise.then((dealData: any) => {
      return dealData;
    })
  }
}
