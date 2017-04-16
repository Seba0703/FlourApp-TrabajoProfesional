import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabla-facturas',
  templateUrl: 'app/app_informes/facturasComponent.html'
})
export class FacturasComponent {
  @Input() tipo:string;
  // suma de los montos de los subtotales para todas las facturas
  sumaSubtotales():number {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      acum += this.calcularSubtotal(this.facturas[i].productos);
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

  // suma de los montos por iva 21% para todos los items
  iva(items:Array<any>):number {
    return 500;
  }

  // suma de los montos por otros impuestos para todos los items
  otros(items:Array<any>):number {
    return 2;
  }

  // suma de los montos por IVA para todas las facturas
  sumaIVA():number {
    return 0;
  }

  // suma de los montos por otros impuestos para todas las facturas
  sumaOtros():number {
    return 0;
  }

  isCompra():boolean {
    return this.tipo == 'Compra';
  }

  isVenta():boolean {
    return this.tipo == 'Venta';
  }

  search(event:any) {
    console.log("Encontrado");
    console.log(event);
    this.facturas = event;
  }

  facturas :Array<any> = [];
}
