import {Injectable} from '@angular/core';

@Injectable()
export class SecurityTokenStore {
  private static TOKEN_KEY = 'finance-token';

  private token: SecurityToken | null = null;

  constructor() {
    if (window.localStorage[SecurityTokenStore.TOKEN_KEY]) {
      this.token = JSON.parse(window.localStorage[SecurityTokenStore.TOKEN_KEY]);
    }
  }

  public get storedValue(): SecurityToken | null {
    return this.token;
  }

  public set storedValue(value: SecurityToken | null) {
    window.localStorage[SecurityTokenStore.TOKEN_KEY] = JSON.stringify(value);
    this.token = value;
  }
}

export interface SecurityToken {
  token: string;
  owner: any;
}
