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
  private allUserIds: string[] = [];
  private currentUserIndex!: number;


  constructor(
    private dealService: DealService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddDealComponent>,
  ) { }

  ngOnInit(): void {
    this.getUserInformation();
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onUserSelected(userName: string) {
    this.currentUserIndex = this.allUsers.indexOf(userName);
  }
  getUserInformation() {
    this.userService.getDoc().subscribe((data) => {
      data.forEach(user => {
        let fullName = user['firstName'] + " " + user['lastName'];
        this.allUsers.push(fullName);
        this.allUserEmail.push(user['email']);
        this.allUserIds.push(user['id']);
      });
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save() {
    this.dealService.createNewDeal(
      this.allUserIds[this.currentUserIndex],
      this.allUserEmail[this.currentUserIndex],
      this.deal
    );
    this.closeDialog();
  }
}
