import { EventEmitter, Injectable } from '@angular/core';
import { TransactionResourceService } from '../resources/transaction-resource.service';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Transaction[] = [];
  public transactionsChanged: EventEmitter<Transaction[]> =
    new EventEmitter<Transaction[]>();

  constructor(private resource: TransactionResourceService) {
  }

  public getTransactions(): void {
    this.resource.fetchTransactions().subscribe((data: Transaction[] | null) => {
      this.transactions = data != null ? data : [];
      this.transactionsChanged.emit(this.transactions);
    });
  }
}
