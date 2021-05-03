import { EventEmitter, Injectable } from '@angular/core';
import { TransactionResourceService } from '../resources/transaction-resource.service';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionAnswer: Transaction = new Transaction(0, 0, 0, 0, new Date());
  transactions: Transaction[] = [];
  public transactionsChanged: EventEmitter<Transaction[]> =
    new EventEmitter<Transaction[]>();
  public transactionAnswerChanged: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  constructor(private resource: TransactionResourceService) {
  }

  public getTransactions(): void {
    this.resource.fetchTransactions().subscribe((data: Transaction[] | null) => {
      this.transactions = data != null ? data : [];
      this.transactionsChanged.emit(this.transactions);
    });
  }

  public postTransaction(target: number, amount: number): void {
    this.resource.postTransaction(target, amount).subscribe((data: Transaction | null) => {
      if (data != null) {
        this.transactionAnswer = data;
        this.transactionAnswerChanged.emit(this.transactionAnswer);
      }
    });
  }
}
