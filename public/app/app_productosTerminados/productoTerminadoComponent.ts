import { Component } from '@angular/core';
//import { ProductoTerminadoServices } from './productoTerminadoServices';

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
            <th>Tipo</th>
            <th>Precio Venta</th>
          </tr>
          </thead>
          <tbody *ngFor="let productoTerminado of productosTerminados">
            <td>{{productoTerminado}}</td>
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

export class ProductoTerminadoComponent {
  productosTerminados = ['WindstormZZ', 'BombastoZZ', 'MagnetaZZ', 'TornadoZZ'];
}