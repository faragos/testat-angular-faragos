import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'wed-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private transactionsSubscription: Subscription | undefined;
  displayedColumns: string[] = ['from', 'target', 'amount', 'total', 'date'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource(this.transactions);

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions();
    this.transactionsSubscription = this.transactionService.transactionsChanged.subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        this.dataSource = new MatTableDataSource(this.transactions);
      });
  }

  ngOnDestroy(): void {
    this.transactionsSubscription?.unsubscribe();
  }
}
