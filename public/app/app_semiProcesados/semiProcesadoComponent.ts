import { Component } from '@angular/core';
//import { SemiProcesadoServices } from './semiProcesadoServices';

@Component({
  selector: 'tabla-semi-procesados',
    template: `
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Embolsado (default)</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
          </tr>
          </thead>
          <tbody *ngFor="let semiProcesado of semiProcesados">
            <td>{{semiProcesado}}</td>
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

export class SemiProcesadoComponent {
  semiProcesados = ['WindstormZ', 'BombastoZ', 'MagnetaZ', 'TornadoZ'];
}