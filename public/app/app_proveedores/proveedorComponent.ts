import { Component } from '@angular/core';
//import { ProvedorServices } from './provedorServices';

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
            <td>{{proveedor}}</td>
            <td>123</td>
            <td>mdo</td>
          </tbody>
        </table>
  `
})

export class ProveedorComponent {
  proveedores = ['WindstormX', 'BombastoX', 'MagnetaX', 'TornadoX'];
}