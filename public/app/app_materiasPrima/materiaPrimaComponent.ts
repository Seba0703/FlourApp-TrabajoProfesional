import { Component } from '@angular/core';
//import { materiaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'tabla-materias-prima',
    template: `
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Precio Venta</th>
            <th>Tipo</th>
            <th>Porcentaje Merma</th>
          </tr>
          </thead>
          <tbody *ngFor="let materiaPrima of materiasPrima">
            <td>{{materiaPrima}}</td>
            <td>1</td>
            <td>12</td>
            <td>123</td>
            <td>1234</td>
            <td>12345</td>
            <td>123456</td>
          </tbody>
        </table>
  `
})

export class MateriaPrimaComponent {
  materiasPrima = ['WindstormY', 'BombastoY', 'MagnetaY', 'TornadoY'];
}