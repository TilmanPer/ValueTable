import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableSettingsComponent } from './table-settings/table-settings.component';
import { FormsModule } from '@angular/forms';
import { ValueTableComponent } from './value-table/value-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSettingsComponent,
    ValueTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
