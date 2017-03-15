import { Component, Input } from '@angular/core';
import { FacturaHeader } from './facturaHeader'

@Component({
  selector: '[factura-header]',
  templateUrl: "app/app_informeVentas/facturaHeaderComponent.html"
})

export class FacturaHeaderComponent {
  @Input() factura: FacturaHeader;
  @Input() subtotal: number;
}
