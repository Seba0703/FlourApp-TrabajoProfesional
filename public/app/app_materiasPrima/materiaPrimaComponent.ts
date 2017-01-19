import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MateriaPrimaServices } from './materiaPrimaServices';

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
            <th>Porcentaje Merma</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
          </tr>
          </thead>
          <tbody *ngFor="let materiaPrima of materiasPrima">
            <td>{{materiaPrima.cantidad}}</td>
            <td>{{materiaPrima.unidad}}</td>
            <td>{{materiaPrima.stockMin}}</td>
            <td>{{materiaPrima.stockMax}}</td>
            <td>{{materiaPrima.porcentajeMerma}}%</td>
            <td>{{materiaPrima.tipo}}</td>
            <td>{{materiaPrima.precioVenta}}</td>
          </tbody>
        </table>
  `
})

export class MateriaPrimaComponent {
  private materiasPrima: Response;
  
  constructor(private ptService: MateriaPrimaServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarMateriasPrima();
  }

  cargarMateriasPrima(){
    console.log("CARGANDO MateriaPrima");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getMateriasPrima()
              .subscribe(
                (materiasPrimaData) => {
                  this.materiasPrima = materiasPrimaData;
                  console.log(this.materiasPrima);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }
}