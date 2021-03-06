import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceBase } from '@app/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionResourceService extends ResourceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  public fetchTransactions(): Observable<Transaction[] | null> {
    return this.get(`/accounts/transactions?count=3&skip=0`)
    .pipe(
      map((result: any) => {
        if (result) {
          return result.result.map(Transaction.fromDto);
        }
        return null;
      }),
      catchError((error: any) => of(null))
    );
  }

  public postTransaction(target: number, amount: number): Observable<Transaction | null> {
    return this.post(`/accounts/transactions`, {target, amount})
    .pipe(
      map((result: any) => {
        if (result) {
          return Transaction.fromDto(result);
        }
        return null;
      }),
      catchError((error: any) => of(null))
    );
  }
}
