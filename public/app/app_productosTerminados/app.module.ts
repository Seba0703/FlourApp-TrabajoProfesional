import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { ProductoTerminadoComponent} from './productoTerminadoComponent';
import { AgregadorProductoTerminadoComponent} from './agregadorProductoTerminadoComponent';

import { ListaPorcentajeServices } from '../listaPorcentaje/ListaPorcentajeServices'
import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';

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
    ProductoTerminadoComponent,
    AgregadorProductoTerminadoComponent
  ],
  providers: [
    ListaPorcentajeServices,
    MateriaPrimaServices,
    SemiProcesadoServices,
    ProductoTerminadoServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
