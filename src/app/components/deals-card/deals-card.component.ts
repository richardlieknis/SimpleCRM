import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';

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
  deal!: Deal;
  dealName!: string;
  fullName!: string;
  email!: string;
  dealSale!: number;
  isDone!: boolean;

  constructor(
    public dealService: DealService,
    private firestore: Firestore,
  ) {
    this.dealColl = collection(this.firestore, 'deals');
  }

  ngOnInit(): void {
    this.getDealData(this.dealId);
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
