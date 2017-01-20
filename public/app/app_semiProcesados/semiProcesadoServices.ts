import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import {URL_SEMIPROCESADOS} from '../rutas';

@Injectable()
export class SemiProcesadoServices{
  public semiProcesados: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO SemiProcesadoS SERVIRCE");
  }

  getSemiProcesados(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_SEMIPROCESADOS).map((response) => response.json())
  }

  agregarSemiProcesado(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_SEMIPROCESADOS, body, {headers: headers});
  }

  borrarSemiProcesado(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_SEMIPROCESADOS + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_SEMIPROCESADOS + "/" + body._id, body, {headers: headers});
  }
}