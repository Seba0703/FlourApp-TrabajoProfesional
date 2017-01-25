import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import {URL_CLIENTES} from '../rutas';

@Injectable()
export class ListaDePrecioServices {
  private clientes: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO ListaDePrecioS SERVIRCE");
  }

  getListaDePrecios(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_CLIENTES).map((response) => response.json())
  }

  agregarListaDePrecio(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_CLIENTES, body, {headers: headers});
  }

  borrarListaDePrecio(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_CLIENTES + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_CLIENTES + "/" + body._id, body, {headers: headers});
  }

}