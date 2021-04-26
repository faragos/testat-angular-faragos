export class Transaction {
  constructor(public from: number,
              public target: number,
              public amount: number,
              public total: number,
              public date: Date) {
  }

  public static fromDto(data: any): Transaction {
    return new Transaction(data.from, data.target, data.amount, data.total, data.date);
  }

  public static fromInfoDto(data: any): Transaction {
    return new Transaction(
      (data.from) ? data.from : void 0,
      (data.target) ? data.target : void 0,
      (data.amount) ? data.amount : void 0,
      (data.total) ? data.total : void 0,
      (data.date) ? data.date : void new Date().getDate()
      );
  }

  toDto(): any {
    return {
      from: this.from,
      target: this.target,
      amount: this.amount,
      total: this.total,
      date: this.date,
    };
  }
}
