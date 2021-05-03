import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceBase } from '@app/core';
import { HttpClient } from '@angular/common/http';
import { AccountInfo } from '../models/accountInfo';

@Injectable({
  providedIn: 'root'
})
export class AccountResourceService extends ResourceBase {

  constructor(http: HttpClient) {
    super(http);
  }

  public fetchMyAccount(): Observable<AccountInfo | null> {
    return this.get(`/accounts`)
    .pipe(
      map((result: any) => {
        if (result) {
          return AccountInfo.fromDto(result);
        }
        return null;
      }),
      catchError((error: any) => of(null))
    );
  }

  public fetchAccount(id: number): Observable<AccountInfo | null> {
    return this.get(`/accounts/${id}`)
    .pipe(
      map((result: any) => {
        if (result) {
          return AccountInfo.fromDto(result);
        }
        return null;
      }),
      catchError((error: any) => of(null))
    );
  }
}
