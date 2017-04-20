import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabla-facturas',
  templateUrl: 'app/app_informes/facturasComponent.html'
})
export class FacturasComponent {
  @Input() tipo:string;

  origen():string {
    if(this.tipo=="Compra" || this.tipo=="compra" || this.tipo=="fact_compra")
      return 'informeCompras';
      if(this.tipo=="Venta" || this.tipo=="venta" || this.tipo=="fact_venta")
      return 'informeVentas';
  }
  // suma de los montos de los subtotales para todas las facturas
  sumaSubtotales():number {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      acum += this.facturas[i].subtotal;
    }
    return acum;
  }

  sumaTotales():number {
    return this.sumaSubtotales()+this.sumaIVA()+this.sumaOtros();
  }

  // calcula el subtotal para una factura
  calcularSubtotal = function(factura:Array<any>) {
    var acum = 0;
    for( var i=0; i < factura.length; i++) {
      acum += (factura[i].cantidad*factura[i].precio_unitario);
    }
    return acum;
  }

  // suma de los montos por IVA para todas las facturas
  sumaIVA():number {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      acum += this.facturas[i].iva;
    }
    return acum;
  }

  // suma de los montos por otros impuestos para todas las facturas
  sumaOtros():number {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      acum += this.facturas[i].otros;
    }
    return acum;
  }

  isCompra():boolean {
    return this.tipo == 'Compra';
  }

  isVenta():boolean {
    return this.tipo == 'Venta';
  }

  search(event:any) {
    this.facturas = event;
  }

  facturas :Array<any> = [];
}
