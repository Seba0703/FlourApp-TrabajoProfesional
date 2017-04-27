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
}
