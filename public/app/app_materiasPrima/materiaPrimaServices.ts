import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import {URL_MATERIAS_PRIMA} from '../rutas';
@Injectable()
export class MateriaPrimaServices{
  public materiasPrima: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO MateriaPrimaS SERVIRCE");
  }

  getMateriasPrima(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_MATERIAS_PRIMA).map((response) => response.json())
  }

  agregarMateriaPrima(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_MATERIAS_PRIMA, body, {headers: headers});
  }

  borrarMateriaPrima(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_MATERIAS_PRIMA + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_MATERIAS_PRIMA + "/" + body._id, body, {headers: headers});
  }
}