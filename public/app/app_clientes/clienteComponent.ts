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
          </tr>
          </thead>
          <tbody *ngFor="let cliente of clientes">
            <td>{{cliente.nombreEmpresa}}</td>
            <td>{{cliente.cuit}}</td>
            <td>{{cliente.direccion}}</td>
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

}