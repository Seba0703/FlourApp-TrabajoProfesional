import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ClienteServices } from './clienteServices';

@Component({
  selector: 'tabla-clientes',
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
          <tbody *ngFor="let cliente of clientes">
            <td>{{cliente.nombreEmpresa}}</td>
            <td>{{cliente.cuit}}</td>
            <td>{{cliente.direccion}}</td>
            <td>
                <button type="button" class="btn btn-success" (click)="modificar()" title="Modificar" >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-danger" (click)="borrar(cliente._id)" title="Borrar" >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
          </tbody>
        </table>
  `
})

export class ClienteComponent {
  private clientes: Response;
  
  constructor(private ptService: ClienteServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO CLIENTES");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getClientes()
              .subscribe(
                (clientesData) => {
                  this.clientes = clientesData;
                  console.log(this.clientes);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.ptService.borrarCliente(id)
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