import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavigationService} from '@app/core';

import {AuthService} from '../services/auth.service';
import {RegistrationInfo} from '../models/registration-info';

@Component({
  selector: 'wed-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  public login?: string;
  public password?: string;
  public passwordConfirm?: string;
  public firstname?: string;
  public lastname?: string;

  public isProcessing = false;

  constructor(private autSvc: AuthService, private navigationSvc: NavigationService) {
  }

  ngOnInit() {
    this.autSvc.authenticatedUserChange.subscribe(
      (credentials) => {
        this.isProcessing = false;
        if (credentials) {
          this.navigationSvc.goToDashboard();
        }
      });
  }

  public doRegister(f?: NgForm): boolean {
    if (f && f.valid) {
      this.isProcessing = true;
      this.autSvc.register(new RegistrationInfo(
        f.value.login,
        f.value.password,
        f.value.firstname,
        f.value.lastname));
    }
    return false;
  }
}
