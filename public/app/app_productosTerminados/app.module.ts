import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ProductoTerminadoComponent} from './productoTerminadoComponent';
import { AgregadorProductoTerminadoComponent} from './agregadorProductoTerminadoComponent';
//import { ProductoTerminadoServices} from './productoTerminadoServices';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProductoTerminadoComponent,
    AgregadorProductoTerminadoComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
