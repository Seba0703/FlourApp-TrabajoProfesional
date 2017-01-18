import { Component } from '@angular/core';
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
            <td>{{cliente}}</td>
            <td>123</td>
            <td>mdo</td>
          </tbody>
        </table>
  `
})

export class ClienteComponent {
  clientes: Array<any> = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  //constructor(private clienteSrv:ClienteServices){}

}