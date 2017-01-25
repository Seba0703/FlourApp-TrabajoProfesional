import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

import {URL_USUARIOS} from '../rutas';

@Injectable()
export class UsuarioServices {

  constructor(private http:Http) {
    console.log("INICIALIZANDO UsuarioS SERVIRCE");
  }

  getUsuarios(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_USUARIOS).map((response) => response.json())
  }

  agregarUsuario(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_USUARIOS, body, {headers: headers});
  }

  borrarUsuario(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_USUARIOS + "/" + id, {headers: headers});
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_USUARIOS + "/" + body._id, body, {headers: headers});
  }

}