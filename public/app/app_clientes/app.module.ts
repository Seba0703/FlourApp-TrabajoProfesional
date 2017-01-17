import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ClienteComponent} from './clienteComponent';
import { AgregadorClienteComponent} from './agregadorClienteComponent';
//import { ClienteServices} from './clienteServices';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ClienteComponent,
    AgregadorClienteComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
