import { Component } from '@angular/core';
//import { SemiProcesadoServices } from './semiProcesadoServices';

@Component({
  selector: 'agregar-producto-terminado',
  templateUrl: 'app/app_productosTerminados/agregadorProductoTerminadoComponent.html'
})

export class AgregadorProductoTerminadoComponent {
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsado: number;
  private tipo: string;
  private precioVenta: number;

  guardar() {
    //console.log(this.nombre + "-" + this.cuit + "-" + this.direccion );
  }

}