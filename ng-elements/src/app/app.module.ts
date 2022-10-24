import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent] //сюди передаються компоненти, які ми не будемо додавати в темплейт по їх селктору напряму чи в роутингу, але так чи інакше будемо використовувати в застосунку, наприклад як Angular Elements
})
export class AppModule { }
