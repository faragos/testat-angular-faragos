import { Injectable } from '@angular/core';

import { NavigationService } from '@app/core';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard /* implements CanLoad, CanActivate */ {
  constructor(private authSvc: AuthService, private navigationSvc: NavigationService) {
  }

  /**
   * Can this route be loaded.
   * @returns True if user is authenticated otherwise false
   */
  public canLoad(): boolean {
    return this.authSvc.hasCredentials;
  }

  /**
   * Can this route be activated?
   * @returns True if user is authenticated otherwise false
   */
  public canActivate(): boolean {
    return this.authSvc.hasCredentials;
  }
}
