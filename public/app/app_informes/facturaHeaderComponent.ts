import { Component, Input } from '@angular/core';

@Component({
  selector: '[factura-header]',
  templateUrl: "app/app_informes/facturaHeaderComponent.html"
})

export class FacturaHeaderComponent {
  @Input() factura: any;
  @Input() iva: number;
  @Input() otros: number;

  nombreEmpresa(contraparte:any) :string {
    if(contraparte == undefined || contraparte.nombreEmpresa == undefined)
      return '--faltan datos--';
    else {
      return contraparte.nombreEmpresa;
    }
  }

  categoriaFiscal(contraparte:any) :string {
    if(contraparte == undefined || contraparte.categoriaFiscal == undefined)
      return '--faltan datos--';
    else {
      return contraparte.categoriaFiscal;
    }
  }

  condicionPago(contraparte:any) :string {
    if(contraparte == undefined || contraparte.condicionPago == undefined)
      return '--faltan datos--';
    else {
      return contraparte.condicionPago;
    }
  }

  totalIVA() :number {
    if(this.factura.iva == undefined)
      return 0.00;
    else
      return this.factura.iva.toFixed(2);
  }

  totalOtros() :number {
    if(this.factura.otros == undefined)
      return 0.00;
    else
      return this.factura.otros.toFixed(2);
  }

  total() :number {
    if(this.factura.total == undefined)
      return 0.00;
    else
      return this.factura.total.toFixed(2);
  }

  subtotal() :number {
    if(this.factura.subtotal == undefined)
      return 0.00;
    else
      return this.factura.subtotal.toFixed(2);
  }
}
