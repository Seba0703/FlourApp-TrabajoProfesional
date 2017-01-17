import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ProveedorComponent} from './proveedorComponent';
import { AgregadorProveedorComponent} from './agregadorProveedorComponent';
//import { ProveedorServices} from './proveedorServices';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProveedorComponent,
    AgregadorProveedorComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
