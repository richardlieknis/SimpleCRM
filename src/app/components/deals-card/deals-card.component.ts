import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { AnyObject } from 'chart.js/types/basic';
import { take } from 'rxjs';
import { DealService } from 'src/app/shared/services/deal.service';
import { RevenueService } from 'src/app/shared/services/revenue.service';
import { Deal } from 'src/models/deal.class';
import { Revenue } from 'src/models/revenue.class';

@Component({
  selector: 'app-deals-card',
  templateUrl: './deals-card.component.html',
  styleUrls: ['./deals-card.component.scss']
})
export class DealsCardComponent implements OnInit {
  private dealColl: CollectionReference<DocumentData>;
  @Input() dealId!: string;
  @Input() index!: number;
  @Input() dealIsDone!: boolean;
  @Input() runDeal!: AnyObject[];

  deal!: Deal;
  dealName!: string;
  fullName!: string;
  email!: string;
  dealSale!: number;
  isDone!: boolean;
  revenue = new Revenue();

  months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  constructor(
    public dealService: DealService,
    private firestore: Firestore,
    private revenueService: RevenueService,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
  }

  ngOnInit(): void {
    this.getDealData(this.dealId);
  }

  completeDeal(){
    const deal: any = this.runDeal[this.index];
    const amount: number = deal['dealSale'] as number;
    const docRef = doc(this.dealColl, deal['id']);
    updateDoc(docRef, {
      isDone: true,
    });
    this.runDeal.splice(this.index, 1);
    this.addRevenue(amount);
  }

  addRevenue(amount: number){
    const currentMonth = new Date().getUTCMonth();
    const currentYear = new Date().getUTCFullYear().toString();
    this.revenueService.read(currentYear)
      .pipe(take(1))
      .subscribe((data) => {
        const newAmount = data[this.months[currentMonth]] + amount;
        this.revenueService.update(currentMonth, "2023", newAmount);
      })
  }

  getDealData(dealId: string) {
    const docRef = doc(this.dealColl, dealId);
    const dealData = docData(docRef);
    dealData.subscribe((deal: any) => {
      this.dealName = deal['dealName'];
      this.fullName = deal['fullName'];
      this.email = deal['email'];
      this.dealSale = deal['dealSale'];
      this.isDone = deal.isDone;
    });
  }
}
