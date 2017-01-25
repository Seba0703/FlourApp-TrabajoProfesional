import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { UsuarioComponent} from './usuarioComponent';
import { AgregadorUsuarioComponent} from './agregadorUsuarioComponent';
import { UsuarioServices} from './usuarioServices';

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
    UsuarioComponent,
    AgregadorUsuarioComponent
  ],
  providers: [ UsuarioServices ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
