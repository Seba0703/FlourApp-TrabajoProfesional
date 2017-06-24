import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { MateriaPrimaComponent} from './materiaPrimaComponent';
import { AgregadorMateriaPrimaComponent} from './agregadorMateriaPrimaComponent';
import { MateriaPrimaServices} from './materiaPrimaServices';
import {RetencionServices} from "../app_retenciones/retencionServices";

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
    MateriaPrimaComponent,
    AgregadorMateriaPrimaComponent
  ],
  providers: [ MateriaPrimaServices, RetencionServices ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
