import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'wed-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private transactionsSubscription: Subscription | undefined;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions();
    this.transactionsSubscription = this.transactionService.transactionsChanged.subscribe(
      (data: Transaction[]) => {
        debugger
        this.transactions = data;
      });
  }

  ngOnDestroy(): void {
    this.transactionsSubscription?.unsubscribe();
  }
}
