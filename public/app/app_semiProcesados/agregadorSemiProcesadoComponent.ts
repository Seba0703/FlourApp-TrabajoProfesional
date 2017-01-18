import { Component } from '@angular/core';
//import { SemiProcesadoServices } from './semiProcesadoServices';

@Component({
  selector: 'agregar-semi-procesado',
  templateUrl: 'app/app_semiProcesados/agregadorSemiProcesadoComponent.html'
})

export class AgregadorSemiProcesadoComponent {
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsado: number;
  private precioVenta: number;
  private tipo: string;

  guardar() {
    //console.log(this.nombre + "-" + this.cuit + "-" + this.direccion );
  }

}