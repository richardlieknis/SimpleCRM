import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { AnyObject } from 'chart.js/types/basic';
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

  read(year: string) {
    const docRef = doc(this.fs, `revenue`, year);
    return docData(docRef);
  }

  create(revenue: Revenue, year: string) {
    const docRef = doc(this.fs, 'revenue', year);
    return setDoc(docRef, revenue.toJSON());
  }

  update(month: number, year: string, amount: number){
    const currentMonth = this.months[month];
    const revenueAmount = amount;
    const upData: any = {};
    upData[currentMonth] = revenueAmount;

    const docRef = doc(this.fs, 'revenue', year);
    return updateDoc(docRef, upData)
  }

}
