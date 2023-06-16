import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DealService } from 'src/app/shared/services/deal.service';
import { Deal } from 'src/models/deal.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-dialog-add-deal',
  templateUrl: './dialog-add-deal.component.html',
  styleUrls: ['./dialog-add-deal.component.scss'],
})
export class DialogAddDealComponent implements OnInit {
  deal = new Deal();
  form!: FormGroup;
  public allUsers: string[] = [];
  private allUserEmail: string[] = [];

  constructor(
    private dealService: DealService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddDealComponent>,
  ) { }

  ngOnInit(): void {
    this.dealService.checkExistingId();
    this.getAllFullUserNames();
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  getAllFullUserNames() {
    this.userService.getDoc().subscribe((data) => {
      data.forEach(user => {
        let fullName = user['firstName'] + " " + user['lastName'];
        this.allUsers.push(fullName);
        this.allUserEmail.push(user['email']);
      });
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save() {
    console.log(this.deal.fullName);
    this.dealService.createDoc();
    this.closeDialog();
  }
}
