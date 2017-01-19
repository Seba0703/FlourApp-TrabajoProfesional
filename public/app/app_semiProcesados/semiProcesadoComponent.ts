import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SemiProcesadoServices } from './semiProcesadoServices';

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
            <th>Porcentaje Merma</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
          </tr>
          </thead>
          <tbody *ngFor="let semiProcesado of semiProcesados">
            <td>{{semiProcesado.cantidad}}</td>
            <td>{{semiProcesado.unidad}}</td>
            <td>{{semiProcesado.stockMin}}</td>
            <td>{{semiProcesado.stockMax}}</td>
            <td>{{semiProcesado.embolsadoCantDefault}}</td>
            <td>{{semiProcesado.porcentajeMerma}}%</td>
            <td>{{semiProcesado.tipo}}</td>
            <td>{{semiProcesado.precioVenta}}</td>
          </tbody>
        </table>
  `
})

export class SemiProcesadoComponent implements OnInit{
  private semiProcesados: Response;
  
  constructor(private ptService: SemiProcesadoServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarSemiProcesados();
  }

  cargarSemiProcesados(){
    console.log("CARGANDO PRODUCTOS TERM");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getSemiProcesados()
              .subscribe(
                (semiProcesadosData) => {
                  this.semiProcesados = semiProcesadosData;
                  console.log(this.semiProcesados);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }
}