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
    return this.get('/accounts/transactions?fromDate=2016-05-11T02:00:00.000Z&toDate=2021-12-11T02:00:00.000Z&count=3&skip=0')
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
}
