import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { InformesServices } from '../app_informes/informesServices';
import { ListadoPreciosComponent }  from './listadoPreciosComponent';
import { DatepickerFlourappComponent } from '../app_informes/datepickerFlourappComponent';
import { DatepickerModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignOutComponent,
    ListadoPreciosComponent,
    DatepickerFlourappComponent
  ],
  providers: [
    InformesServices,
    DatepickerModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
