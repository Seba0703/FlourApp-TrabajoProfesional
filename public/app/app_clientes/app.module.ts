import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { ClienteComponent} from './clienteComponent';
import { AgregadorClienteComponent} from './agregadorClienteComponent';

import { ClienteServices} from './clienteServices';

import { ListaDePrecioServices} from '../app_listaDePrecios/ListaDePrecioServices';
import { ListaPorcentajeServices } from '../listaPorcentaje/ListaPorcentajeServices'

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';
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
    ClienteComponent,
    AgregadorClienteComponent
  ],
  providers: [ 
  	ClienteServices,
  	ListaDePrecioServices,
    RetencionServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
