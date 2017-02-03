import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ComponenteSeleccionado } from './componenteSeleccionado';
import { URL_LISTA_PORCENTAJES } from '../rutas';

@Injectable()
export class ListaPorcentajeServices {

  constructor(private http:Http) {
    console.log("INICIALIZANDO ListaDePrecioS SERVIRCE");
  }

  getListaPorcentajes(): Observable<ComponenteSeleccionado[]>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_LISTA_PORCENTAJES)
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  agregarComponente(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_LISTA_PORCENTAJES, body, {headers: headers});
  }

  borrarListaPorcentajes(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE COMPONENTS REQUEST");
    return this.http.delete(URL_LISTA_PORCENTAJES + "/productoList/" + id, {headers: headers})
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_LISTA_PORCENTAJES + "/" + body._id, body, {headers: headers});
  }

/*  modificarNombre(body: any): Observable<ElementoListaPorcentajes[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_LISTA_PORCENTAJES + "/list/" + body.actualName, body, {headers: headers})
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }*/

}