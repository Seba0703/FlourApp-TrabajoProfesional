import { Component } from '@angular/core';
import { FacturaItem } from './facturaItem'

@Component({
  selector: 'tabla-informe-compras',
  templateUrl: 'app/app_informeCompras/informeComprasComponent.html'
})
export class InformeComprasComponent {
  sumaSubtotales = function() {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      acum += this.calcularSubtotal(this.facturas[i].productos);
    }
    return acum;
  }

  sumaTotales = function() {
    var acum = 0;
    for( var i=0; i < this.facturas.length; i++) {
      var subtotal = this.calcularSubtotal(this.facturas[i].productos);
      acum += subtotal+(subtotal*this.facturas[i].iva/100);
    }
    return acum;
  }

  calcularSubtotal = function(factura:Array<FacturaItem>) {
    var acum = 0;
    for( var i=0; i < factura.length; i++) {
      acum += (factura[i].cantidad*factura[i].precio_unitario);
    }
    return acum;
  }

  facturas = [
      {
        numero: 1,
        cliente: 'Tony \"El \"Gordo',
        categ_fiscal: 'Responsable Inscripto',
        cond_pago: '0-30-60',
        subtotal: 1000,
        iva: 21,
        productos: [
        {
        cantidad: 10,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50
        },
        {
        cantidad: 5,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70
        }
        ]
      },
      {
        numero: 2,
        cliente: 'Benito Cámelas',
        categ_fiscal: 'Responsable Inscripto',
        cond_pago: '0-30-60',
        subtotal: 2500,
        iva: 21,
        productos: [
        {
        cantidad: 50,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50
        },
        {
        cantidad: 10,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70
        },
        {
        cantidad: 20,
        descripcion: 'Pochoclo 3',
        precio_unitario: 50
        }
        ]
      },
      {
        numero: 3,
        cliente: 'Uciel Rodiguez',
        categ_fiscal: 'Consumidor Final',
        cond_pago: '0-30-60',
        iva: 17.5,
        subtotal: 1700,
        productos: [
        {
        cantidad: 50,
        descripcion: 'Pochoclo 1',
        precio_unitario: 50
        },
        {
        cantidad: 63,
        descripcion: 'Pochoclo 2',
        precio_unitario: 70
        },
        {
        cantidad: 43,
        descripcion: 'Pochoclo 3',
        precio_unitario: 50
        },
        {
        cantidad: 1000,
        descripcion: 'Frutigram',
        precio_unitario: 0.5
        },
        {
        cantidad: 12,
        descripcion: 'Bananita Dolca',
        precio_unitario: 5.75
        }
        ]
      },
    ];
}
