import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'tabla-proveedores',
    template: `
          <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Nombre Empresa</th>
            <th>CUIT</th>
            <th>Dirección</th>
          </tr>
          </thead>
          <tbody *ngFor="let proveedor of proveedores">
            <td>{{proveedor.nombreEmpresa}}</td>
            <td>{{proveedor.cuit}}</td>
            <td>{{proveedor.direccion}}</td>
          </tbody>
        </table>
  `
})

export class ProveedorComponent {
  private proveedores: Response;
  
  constructor(private ptService: ProveedorServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO CLIENTES");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getProveedores()
              .subscribe(
                (proveedoresData) => {
                  this.proveedores = proveedoresData;
                  console.log(this.proveedores);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }
}