import { Injectable } from '@angular/core';

import { NavigationService } from '@app/core';

import { AuthService } from '../auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class WeclomeGuard /* implements CanLoad, CanActivate */ {
  constructor(private authSvc: AuthService, private navigationSvc: NavigationService) {
  }

  /**
   * Can this route be loaded.
   * @returns True if user is authenticated otherwise false
   */
  public canLoad(): boolean {
    if (this.authSvc.hasCredentials) {
      this.navigationSvc.goToDashboard();
      return false;
    }
    return true;
  }

  /**
   * Can this route be activated?
   * @returns True if user is authenticated otherwise false
   */
  public canActivate(): boolean {
    if (this.authSvc.hasCredentials) {
      this.navigationSvc.goToDashboard();
      return false;
    }
    return true;
  }
}
