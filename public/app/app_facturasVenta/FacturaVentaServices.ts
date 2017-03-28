import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import { FacturaVentaModelDB } from './FacturaVentaModelDB'
import { Producto } from './Producto'
import {URL_FACTURAS_VENTA, URL_FACTURA_ITEMS} from '../rutas';

@Injectable()
export class FacturaVentaServices {

  constructor(private http:Http) {
    console.log("INICIALIZANDO FacturaVenta SERVIRCE");
  }

  getFacturas(): Observable<FacturaVentaModelDB[]>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_FACTURAS_VENTA).map((response) => response.json())
  }

  agregarFactura(body: Object): Observable<FacturaVentaModelDB> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_FACTURAS_VENTA, body, {headers: headers}).map((response) => response.json());
  }

  borrarFactura(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_FACTURAS_VENTA + "/" + id, {headers: headers});
  }

  modificarFactura(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_FACTURAS_VENTA + "/" + body._id, body, {headers: headers});
  }

  getProductosDeLaFacturaID(facturaID: string): Observable<Producto[]>{
    return this.http
    .get(URL_FACTURA_ITEMS + "/factura/" + facturaID)
    .map((response) => {
      //console.log(response)
      //console.log(response.json())

      let productos = new Array<Producto>()
      for (var i = 0; i < response.json().length; i++) {
        productos
        .push(
          new Producto(
            response.json()[i]._id, 
            response.json()[i].tipo, 
            response.json()[i].nombre, 
            response.json()[i].cantidad, 
            response.json()[i].precio, 
            response.json()[i].iva))
      }

      //console.log(productos)

      return productos
    })

  }

  vincularProducto(body: Object): Observable<FacturaVentaModelDB>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_FACTURA_ITEMS, body, {headers: headers}).map((response) => response.json())
  }

}