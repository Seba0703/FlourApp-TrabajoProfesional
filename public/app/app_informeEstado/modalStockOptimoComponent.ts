import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { InformesServices } from '../app_informes/informesServices';

@Component({
  selector: 'modificar-stock-optimo',
  templateUrl: 'app/app_informeEstado/modalStockOptimoComponent.html'
})

export class StockOptimoComponent {
  private stockMin: number;
  private stockMax: number;
  private optimo: string;
  private desvio: number;
  @Input() nombre: number;
  @Input() cantidad: number;
  @Input() min: number;
  @Input() max: number;
  @Input() recomendacion: number;
  @Input() valor_optimo: string;
  @Input() optimo_actual: string;
  @Input() id: string;
  @Input() tipo:string;


  private mostrarModalAgregar: boolean = true;

  constructor(private iService: InformesServices) {
    this.desvio = 20;
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.stockMin = this.min;
    this.stockMax = this.max;
    this.optimo = this.valor_optimo;
  }

  optimoInt(): number {
    return parseInt(this.optimo);
  }

  modificarValores(id:string, min:number, max:number, optimo:string, tipo:string) {
    console.log(min);
    console.log(max);
    console.log(optimo);
    console.log(id);
    let modificarStock = {
      _id: id,
      stockMin: (this.optimoInt()-(this.optimoInt()*this.desvio/100)).toFixed(0),
      stockMax: (this.optimoInt()+(this.optimoInt()*this.desvio/100)).toFixed(0),
      stockOptimo: optimo,
      tipo: tipo
    }
    this.iService.modificarStockOptimo(modificarStock)
    .subscribe(data => {
        console.log("Listo");

        alert("\t\t\t\t¡Stock Optimo modificado!\n\n Pulse 'Aceptar' para actualizar y visualizar los cambios");
        window.location.reload();
    }, error => {
        console.log(JSON.stringify(error.json()));
        alert("\t\t\t\t¡ERROR al modificar Stock!\n\nRevise los campos");
    });
  }
}
