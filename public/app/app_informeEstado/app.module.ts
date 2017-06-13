import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { InformesServices } from '../app_informes/informesServices';
import { EstadoStockComponent } from './estadoStockComponent';
import { StockItemComponent } from './stockItemComponent';
import { StockOptimoComponent } from './modalStockOptimoComponent';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignOutComponent,
    EstadoStockComponent,
    StockItemComponent,
    StockOptimoComponent
  ],
  providers: [
    InformesServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
