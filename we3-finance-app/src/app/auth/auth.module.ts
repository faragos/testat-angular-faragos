import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared';

import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';
import { RegisterComponent } from './components/register.component';

import { TokenInterceptor } from './resources/token-interceptor';
import { AuthResourceService } from './resources/auth-resource.service';

import { SecurityTokenStore } from './services/credential-management/security-token-store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const EXPORTED_DECLARATIONS: Array<Type<any> | any[]> = [
  LoginComponent, LogoutComponent, RegisterComponent
  // TODO: Add declarations here, if additional components should be exported
];
const INTERNAL_DECLARATIONS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS
  // TODO: Add declarations here, if additional components should be registered for the Auth module
];
const EXPORTS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS
];

@NgModule({
  declarations: INTERNAL_DECLARATIONS,
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: EXPORTS,
  providers: [AuthResourceService]
})
export class AuthModule {
  static forRoot(config?: {}): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        // DI Multi-Providers (Services, Tokens, Factories...) to be used globally and instantiated only once.
        // For Single-Providers use {providedIn: 'root'} instead.

        // TODO: Add services/guards/... here or use {providedIn: 'root'} directly on those classes
        SecurityTokenStore,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }]
    };
  }
}
