export class Transaction {
  constructor(public from: number,
              public to: number,
              public amount: number) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(data.from, data.to, data.amount);
  }

  public static fromInfoDto(data: any): Transaction {
    return new Transaction(
      (data.from) ? data.from : void 0,
      (data.to) ? data.to : void 0,
      (data.amount) ? data.amount : void 0);
  }

  toDto(): any {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
    };
  }
}
