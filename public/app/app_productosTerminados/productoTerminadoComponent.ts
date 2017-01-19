import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ProductoTerminadoServices } from './productoTerminadoServices';

@Component({
  selector: 'tabla-productos-terminados',
    template: `
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Embolsado (default)</th>
            <th>Porcentaje Merma</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
          </tr>
          </thead>
          <tbody *ngFor="let productoTerminado of productosTerminados">
            <td>{{productoTerminado.cantidad}}</td>
            <td>{{productoTerminado.unidad}}</td>
            <td>{{productoTerminado.stockMin}}</td>
            <td>{{productoTerminado.stockMax}}</td>
            <td>{{productoTerminado.embolsadoCantDefault}}</td>
            <td>{{productoTerminado.porcentajeMerma}}%</td>
            <td>{{productoTerminado.tipo}}</td>
            <td>{{productoTerminado.precioVenta}}</td>
          </tbody>
        </table>
  `
})
export class ProductoTerminadoComponent implements OnInit{
  private productosTerminados: Response;
  
  constructor(private ptService: ProductoTerminadoServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO PRODUCTOS TERM");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getProductosTerminados()
              .subscribe(
                (productosTerminadosData) => {
                  this.productosTerminados = productosTerminadosData;
                  console.log(this.productosTerminados);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }
}