import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import { FacturaCompraModelDB } from './FacturaCompraModelDB'
import { FacturaCompra } from './FacturaCompra'
import { Producto } from './Producto'
import {URL_DOCUMENTOS_MERCANTILES, URL_DOCUMENTOS_MERCANTILES_ITEMS} from '../rutas';

@Injectable()
export class FacturaCompraServices {

  constructor(private http:Http) {
    console.log("INICIALIZANDO FacturaCompra SERVIRCE");
  }

  getFacturas(): Observable<FacturaCompraModelDB[]>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_DOCUMENTOS_MERCANTILES + "/porTipo/fact_compra").map((response) => response.json())
  }

  agregarFactura(body: Object): Observable<FacturaCompraModelDB> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_DOCUMENTOS_MERCANTILES, body, {headers: headers}).map((response) => response.json());
  }

  borrarFactura(factura: FacturaCompra): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");

    for(let prod of factura.productos){
      this.http.delete(URL_DOCUMENTOS_MERCANTILES_ITEMS + "/" + prod._id, {headers: headers}).subscribe()
    }

    return this.http.delete(URL_DOCUMENTOS_MERCANTILES + "/" + factura._id, {headers: headers});
  }

  modificarFactura(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_DOCUMENTOS_MERCANTILES + "/" + body._id, body, {headers: headers});
  }

  getProductosDelDocumentoMercantilID(documentoMercantilID: string): Observable<Producto[]>{
    return this.http
    .get(URL_DOCUMENTOS_MERCANTILES_ITEMS + "/documentoMercantil/" + documentoMercantilID)
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
            response.json()[i].productoID, 
            response.json()[i].nombre, 
            response.json()[i].cantidad, 
            response.json()[i].precio, 
            response.json()[i].iva))
      }

      //console.log(productos)

      return productos
    })

  }

  vincularProducto(body: Object): Observable<FacturaCompraModelDB>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_DOCUMENTOS_MERCANTILES_ITEMS, body, {headers: headers}).map((response) => response.json())
  }

  modificarProducto(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_DOCUMENTOS_MERCANTILES_ITEMS + "/" + body._id, body, {headers: headers});
  }

}