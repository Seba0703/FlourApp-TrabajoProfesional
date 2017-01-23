import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { ProveedorComponent} from './proveedorComponent';
import { AgregadorProveedorComponent} from './agregadorProveedorComponent';
import { ProveedorServices} from './proveedorServices';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SignOutComponent,
    ProveedorComponent,
    AgregadorProveedorComponent
  ],
  providers: [ ProveedorServices ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
