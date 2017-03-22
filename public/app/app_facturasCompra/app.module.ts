import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DatepickerModule } from 'ng2-bootstrap';

import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { FacturaCompraComponent }  from './FacturaCompraComponent';

import { ProveedorServices } from '../app_proveedores/proveedorServices';
import { ListaDePrecioServices } from '../app_listaDePrecios/ListaDePrecioServices';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { ListaPorcentajeServices } from '../listaPorcentaje/ListaPorcentajeServices'
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';

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
    FacturaCompraComponent
  ],
  providers: [
    ProveedorServices,
    ListaDePrecioServices,
    MateriaPrimaServices,
    ListaPorcentajeServices,
    SemiProcesadoServices,
    ProductoTerminadoServices
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
