import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { FacturaHeaderComponent } from './facturaHeaderComponent';
import { FacturaBodyComponent } from './facturaBodyComponent';
import { BarraBusquedaFacturaComponent } from '../app_informes/barraBusquedaFacturaComponent';
import { InformesServices } from '../app_informes/informesServices';

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
    FacturaHeaderComponent,
    FacturaBodyComponent,
    BarraBusquedaFacturaComponent
  ],
  providers: [
    InformesServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
