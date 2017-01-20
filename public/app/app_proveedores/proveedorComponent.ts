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
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody *ngFor="let proveedor of proveedores">
            <td>{{proveedor.nombreEmpresa}}</td>
            <td>{{proveedor.cuit}}</td>
            <td>{{proveedor.direccion}}</td>
            <td>
                <button type="button" class="btn btn-success" (click)="modificar()" title="Modificar" >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-danger" (click)="borrar(proveedor._id)" title="Borrar" >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
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

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.ptService.borrarProveedor(id)
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