import { EventEmitter, Injectable } from '@angular/core';
import { AccountResourceService } from '../resources/account-resource.service';
import { AccountInfo } from '../models/accountInfo';
import { Account } from '../../auth/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  acc: Account = new Account('', '', '', '0');
  accInfo: AccountInfo | null = null;
  myAccInfo: AccountInfo = new AccountInfo(0, 0, 0, this.acc);
  public authInfoChanged: EventEmitter<AccountInfo | null> =
    new EventEmitter<AccountInfo | null>();
  public myAuthInfoChanged: EventEmitter<AccountInfo> =
    new EventEmitter<AccountInfo>();

  constructor(private resource: AccountResourceService) {
  }

  public getAccount(id: number): void {
    this.resource.fetchAccount(id).subscribe((data: AccountInfo | null) => {
      this.accInfo = data != null ? data : null;
      this.authInfoChanged.emit(this.accInfo);
    });
  }

  public getMyAccount(): void {
    this.resource.fetchMyAccount().subscribe((data: AccountInfo | null) => {
      this.myAccInfo = data != null ? data : new AccountInfo(0, 0, 0, this.acc);
      this.myAuthInfoChanged.emit(this.myAccInfo);
    });
  }
}
