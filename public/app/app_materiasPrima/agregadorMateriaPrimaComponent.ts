import { Component } from '@angular/core';
//import { materiaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private precioVenta: number;
  private tipo: string;
  private porcentaje: number;
  private merma: number;

  guardar() {
    //console.log(this.nombre + "-" + this.cuit + "-" + this.direccion );
  }

}