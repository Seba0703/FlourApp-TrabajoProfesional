import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import {URL_PROVEEDORES} from '../rutas';

@Injectable()
export class ProveedorServices {
  private proveedores: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO proveedores SERVIRCE");
  }

  getProveedores(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_PROVEEDORES).map((response) => response.json())
  }

  agregarProveedor(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_PROVEEDORES, body, {headers: headers});
  }

  borrarProveedor(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_PROVEEDORES + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_PROVEEDORES + "/" + body._id, body, {headers: headers});
  }
}