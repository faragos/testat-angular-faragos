import { Account } from '../../auth/models/account';

export class AccountInfo {
  constructor(public ownerId: number,
    public accountNr: number,
    public amount: number,
    public owner: Account) {
  }

  public static fromDto(data: any): AccountInfo {
    return new AccountInfo(data.ownerId, data.accountNr, data.amount, data.owner);
  }

  public static fromInfoDto(data: any): AccountInfo {
    return new AccountInfo(
      (data.ownerId) ? data.ownerId : void 0,
      (data.accountNr) ? data.accountNr : void 0,
      (data.amount) ? data.amount : void 0,
      (data.owner) ? data.owner : void 0,
    );
  }

  toDto(): any {
    return {
      from: this.ownerId,
      target: this.accountNr,
      amount: this.amount,
      owner: this.owner
    };
  }
}
