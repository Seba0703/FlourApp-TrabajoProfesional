import { Component, Input } from '@angular/core';
import { InformesServices } from '../app_informes/informesServices';

@Component({
  selector: 'modificar-stock-optimo',
  templateUrl: 'app/app_informeEstado/modalStockOptimoComponent.html'
})

export class StockOptimoComponent {
  private stockMin: number;
  private stockMax: number;
  private optimo: string;
  @Input() nombre: number;
  @Input() cantidad: number;
  @Input() min: number;
  @Input() max: number;
  @Input() recomendacion: number;
  @Input() valor_optimo: string;
  @Input() optimo_actual: string;
  @Input() id: string;


  private mostrarModalAgregar: boolean = true;

  constructor(private iService: InformesServices) {}

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.stockMin = this.min;
    this.stockMax = this.max;
    this.optimo = this.valor_optimo;
  }

  modificarValores(id:string, min:number, max:number, optimo:string) {
    console.log(min);
    console.log(max);
    console.log(optimo);
    console.log(id);
    let modificarStock = {
      _id: id,
      min: min,
      max: max,
      optimo: optimo
    }
    this.iService.modificarStockOptimo(modificarStock);
      // .subscribe(data => {
      //   console.log("materiaPrima creado!!!");
      //   console.log(data);
      //   this.mostrarModalAgregar = false;
      //   alert("\t\t\t\t¡Materia Prima agregada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
      //   window.location.reload();
      // }, error => {
      //   console.log(JSON.stringify(error.json()));
      //   alert("\t\t\t\t¡ERROR al agregar Materia Prima!\n\nrevise los campos");
      // });
  }
}
