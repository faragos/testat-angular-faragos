import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthModule } from '../auth/auth.module';

import { DashbaordRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { MatListModule } from '@angular/material/list';
import { TransactionsComponent } from './components/transactions/transactions.component';

const EXPORTED_DECLARATIONS: Array<Type<any> | any[]> = [
  // Declarations (Components / Directives) which can be used outside the Module
];
const INTERNAL_DECLARATIONS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS,
  // Declarations (Components / Directives) which can be used inside the Module
  MainComponent
];
const EXPORTS: Array<Type<any> | any[]> = [
  ...EXPORTED_DECLARATIONS
  // Components/Directives (or even Modules) to export (available for other modules)
];

@NgModule({
  declarations: [
    INTERNAL_DECLARATIONS,
    TransactionsComponent
  ],
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, CommonModule, FormsModule,
    AuthModule, DashbaordRoutingModule, MatListModule
  ],
  exports: EXPORTS,
  providers: [
    // DI Providers (hierarchical)
    // (Services, Tokens, Factories, ...) used from/within this Module
    //  * Registers these Classes for the current Module; importing Modules will create new instances (for importing level and below)
  ]
})
export class DashboardModule {
  // Do not add forRoot(), static references to this module from the Root/App Module will prevent lazy loading!
}
