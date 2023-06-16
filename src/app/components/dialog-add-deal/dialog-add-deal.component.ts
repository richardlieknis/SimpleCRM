import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss'],
})
export class DialogAddDealComponent implements OnInit {
  deal = new Deal();
  form!: FormGroup;

  constructor(
    private dealService: DealService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddDealComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  save() {

  }
}
