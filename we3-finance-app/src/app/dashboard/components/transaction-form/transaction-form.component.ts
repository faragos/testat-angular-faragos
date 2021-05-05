import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountInfo } from '../../models/accountInfo';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'wed-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionAnswer: Transaction | undefined;
  myAccountInfo: AccountInfo | undefined;
  accountInfo: AccountInfo | undefined;
  private accountInfoSubscription: Subscription | undefined;
  private myAccountInfoSubscription: Subscription | undefined;
  private postTransactionSubscription: Subscription | undefined;
  transactionSucceeded = false;
  valueValid = false;

  constructor(private accountService: AccountService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.accountInfoSubscription = this.accountService.authInfoChanged.subscribe(
      (data: AccountInfo) => {
        this.accountInfo = data;
      });

    this.myAccountInfoSubscription = this.accountService.myAuthInfoChanged.subscribe(
      (data: AccountInfo) => {
        this.myAccountInfo = data;
      });

    this.postTransactionSubscription = this.transactionService.transactionAnswerChanged.subscribe(
      (data: Transaction) => {
        this.transactionService.getTransactions();
        this.accountService.getMyAccount();
        this.transactionAnswer = data;
        this.transactionSucceeded = true;
      });
    this.accountService.getMyAccount();
  }

  public getAccountInfo(event: any): void {
    this.accountService.getAccount(event.target.value);
  }

  public checkValue(event: any): void {
    this.valueValid = event.target.value > 0.05;
  }

  public resetTransactionView(): void {
    this.transactionSucceeded = false;
    this.valueValid = false;
  }

  public onSubmit(f?: NgForm): boolean {
    if (f && f.valid) {
      this.transactionService.postTransaction(f.value.target, f.value.amount);
      this.accountInfo = undefined;
      f.resetForm();
    }
    return false;
  }
}
