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
  private postTranscationSubscription: Subscription | undefined;
  transactionSucceeded = false;

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

    this.postTranscationSubscription = this.transactionService.transactionAnswerChanged.subscribe(
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

  public resetTransactionView(): void {
    this.transactionSucceeded = false;
  }

  public onSubmit(f?: NgForm): boolean {
    if (f && f.valid) {
      this.transactionService.postTransaction(f.value.target, f.value.amount);
    }
    return false;
  }
}
