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
            <th>Acciones</th>
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
            <td>
                <button type="button" class="btn btn-success" (click)="modificar()" title="Modificar" >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-danger" (click)="borrar(productoTerminado._id)" title="Borrar" >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
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

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.ptService.borrarProductoTerminado(id)
                      .subscribe(
                        () => { 
                      alert("¡Se borro existosamente! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                      },
                        err => console.error("EL ERROR FUE: ", err)
                      );
    } else {
        console.log("You pressed CANCEL!");
    }
  }  
}