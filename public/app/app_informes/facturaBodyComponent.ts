import { Component, Input } from '@angular/core';
import { FacturaItem } from './facturaItem'

@Component({
  selector: '[factura-body]',
  templateUrl: "app/app_informes/facturaBodyComponent.html"
})

export class FacturaBodyComponent {
  @Input() factura: Array<any>;
  @Input() id: number;
}
