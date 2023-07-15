import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, docData, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { AnyObject } from 'chart.js/types/basic';
import { Observable } from 'rxjs';
import { Revenue } from 'src/models/revenue.class';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  revenue = new Revenue();
  months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  constructor(
    private fs: Firestore,
  ) {

  }

  async readDocNames() {
    const docCollection = collection(this.fs, 'revenue');
    return collectionData(docCollection, { idField: 'id' });
  }

  async getDocs(){
    const docCollection = collection(this.fs, 'revenue');
    const querySnapshot = await getDocs(docCollection);
    return querySnapshot;
  }

  read(year: string) {
    const docRef = doc(this.fs, `revenue`, year);
    return docData(docRef);
  }

  create(revenue: Revenue, year: string) {
    const docRef = doc(this.fs, 'revenue', year);
    return setDoc(docRef, revenue.toJSON());
  }

  update(month: number, year: string, amount: number) {
    const currentMonth = this.months[month];
    const revenueAmount = amount;
    const upData: any = {};
    upData[currentMonth] = revenueAmount;

    const docRef = doc(this.fs, 'revenue', year);
    return updateDoc(docRef, upData)
  }

}
