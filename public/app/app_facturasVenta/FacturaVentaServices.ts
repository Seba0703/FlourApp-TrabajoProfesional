import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import { FacturaVentaModelDB } from './FacturaVentaModelDB'
import {URL_FACTURAS_VENTA} from '../rutas';

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

}