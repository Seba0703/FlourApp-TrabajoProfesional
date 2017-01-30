import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import { ProductoTerminado } from './productoTerminado';
import {URL_PRODUCTOS_TERMINADOS} from '../rutas';

@Injectable()
export class ProductoTerminadoServices{
  public productosTerminados: Array<any>;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO ProductoTerminadoS SERVIRCE");
  }

  getProductosTerminados(): Observable<Response>  {
  	console.log("HACIENDO REQUEST");
  	return this.http.get(URL_PRODUCTOS_TERMINADOS).map((response) => response.json())
  }

  getBasicDataProductosTerminados(): Observable<ProductoTerminado[]> {
    return this.http.get(URL_PRODUCTOS_TERMINADOS).map((response) => response.json())
  }

  agregarProductoTerminado(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_PRODUCTOS_TERMINADOS, body, {headers: headers});
  }

  borrarProductoTerminado(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_PRODUCTOS_TERMINADOS + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_PRODUCTOS_TERMINADOS + "/" + body._id, body, {headers: headers});
  }
}