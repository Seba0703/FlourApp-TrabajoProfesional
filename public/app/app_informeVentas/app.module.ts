import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { FacturaHeaderComponent } from '../app_informes/facturaHeaderComponent';
import { FacturaBodyComponent } from '../app_informes/facturaBodyComponent';
import { BarraBusquedaFacturaComponent } from '../app_informes/barraBusquedaFacturaComponent';
import { InformesServices } from '../app_informes/informesServices';
import { FacturasComponent } from '../app_informes/facturasComponent';

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
    BarraBusquedaFacturaComponent,
    FacturasComponent
  ],
  providers: [
    InformesServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
