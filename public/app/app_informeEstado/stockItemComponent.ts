import { Component, Input } from '@angular/core';

@Component({
  selector: 'stock-item',
  templateUrl: "app/app_informeEstado/stockItemComponent.html"
})

export class StockItemComponent {
  @Input() nombre: string;
  @Input() min: number;
  @Input() max: number;
  @Input() actual: number;
  @Input() optimo: number;
  @Input() optimo_actual: number;
  @Input() id: string;
  @Input() tipo: string;

  estadoColor():string {
    if(this.actual>this.max)
      return 'text-warning';
    if(this.actual<this.min)
      return 'text-danger';
    return 'text-success';
  }

  estadoColorBarra():string {
    if(this.actual>this.max)
      return 'bg-warning';
    if(this.actual<this.min)
      return 'bg-danger';
    return 'bg-success';
  }

  estadoTexto():string {
    if(this.actual>this.max)
      return 'excedido';
    if(this.actual<this.min)
      return 'faltante';
    return 'óptimo';
  }

  recomendacion():string {
    if(this.optimo == this.optimo_actual && this.actual>this.max)
      return 'la compra mensual superó los valores óptimos';
    if(this.optimo == this.optimo_actual && this.actual<this.min)
      return 'Aumentar óptimo a ';
    return '';
  }

  valor_optimo():number {
    return (this.optimo);
  }
}
