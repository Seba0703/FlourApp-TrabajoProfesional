import { Component, Input } from '@angular/core';
import { FacturaHeader } from './facturaHeader'

@Component({
  selector: '[factura-header]',
  templateUrl: "app/app_informeCompras/facturaHeaderComponent.html"
})

export class FacturaHeaderComponent {
  @Input() factura: FacturaHeader;
  @Input() iva: number;
  @Input() otros: number;
  @Input() subtotal: number;
}
