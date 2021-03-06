import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeDeCH from '@angular/common/locales/de-CH';
import localeDeCHExtra from '@angular/common/locales/extra/de-CH';

import { CoreModule } from '@app/core';

import { WelcomeModule } from './welcome/welcome.module';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    CoreModule.forRoot(),
    AuthModule.forRoot(),
    WelcomeModule.forRoot(),

    AppRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de-CH'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { // RootModule
  constructor() {
    registerLocaleData(localeDeCH, 'de-CH', localeDeCHExtra);
  }
}
