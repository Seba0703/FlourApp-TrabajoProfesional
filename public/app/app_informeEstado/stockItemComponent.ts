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
}
