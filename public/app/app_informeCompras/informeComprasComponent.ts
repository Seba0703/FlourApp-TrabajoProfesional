import { Component } from '@angular/core';
import { FacturaItem } from './facturaItem'

@Component({
  selector: 'tabla-informe-compras',
  templateUrl: 'app/app_informeCompras/informeComprasComponent.html'
})
export class InformeComprasComponent {
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
  calcularSubtotal = function(factura:Array<FacturaItem>) {
    var acum = 0;
    for( var i=0; i < factura.length; i++) {
      acum += (factura[i].cantidad*factura[i].precio_unitario);
    }
    return acum;
  }

  // suma de los montos por iva 21% para todos los items
  iva(items:Array<FacturaItem>):number {
    return 500;
  }

  // suma de los montos por otros impuestos para todos los items
  otros(items:Array<FacturaItem>):number {
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

  facturas = [
      {
        numeroFactura: 1,
        cliente: 'Tony \"El \"Gordo',
        categ_fiscal: 'Responsable Inscripto',
        cond_pago: '0-30-60',
        subtotal: 1000,
        total: 20,
        productos: [
        {
        cantidad: 10,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50,
        iva: 21
        },
        {
        cantidad: 5,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70,
        iva: 21
        }
        ]
      },
      {
        numeroFactura: 2,
        cliente: 'Benito Cámelas',
        categ_fiscal: 'Responsable Inscripto',
        cond_pago: '0-30-60',
        subtotal: 2500,
        total: 20,
        productos: [
        {
        cantidad: 50,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50,
        iva: 21
        },
        {
        cantidad: 10,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70,
        iva: 21
        },
        {
        cantidad: 20,
        descripcion: 'Pochoclo 3',
        precio_unitario: 50,
        iva: 21
        }
        ]
      },
      {
        numeroFactura: 3,
        cliente: 'Uciel Rodiguez',
        categ_fiscal: 'Consumidor Final',
        cond_pago: '0-30-60',
        subtotal: 1700,
        total: 20,
        productos: [
        {
        cantidad: 50,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50,
        iva: 21
        },
        {
        cantidad: 63,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70,
        iva: 21
        },
        {
        cantidad: 43,
        descripcion: 'Pochoclo 3',
        precio_unitario: 50,
        iva: 21
        },
        {
        cantidad: 1000,
        descripcion: 'Frutigram',
        precio_unitario: 0.5,
        iva: 21
        },
        {
        cantidad: 12,
        descripcion: 'Bananita Dolca',
        precio_unitario: 5.75,
        iva: 21
        }
        ]
      },
    ];
}
