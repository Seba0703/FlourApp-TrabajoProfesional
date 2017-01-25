import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { ListaDePrecioComponent} from './listaDePrecioComponent';
import { AgregadorListaDePrecioComponent} from './agregadorListaDePrecioComponent';
import { ListaDePrecioServices} from './listaDePrecioServices';

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
    ListaDePrecioComponent,
    AgregadorListaDePrecioComponent
  ],
  providers: [ ListaDePrecioServices ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
