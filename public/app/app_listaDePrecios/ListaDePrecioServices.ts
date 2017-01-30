import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ElementoListaDePrecios } from './elementoListaDePrecios';
import { URL_LISTA_PRECIOS } from '../rutas';

@Injectable()
export class ListaDePrecioServices {

  constructor(private http:Http) {
    console.log("INICIALIZANDO ListaDePrecioS SERVIRCE");
  }

  getListaDePrecios(): Observable<ElementoListaDePrecios[]>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_LISTA_PRECIOS)
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  agregarListaDePrecio(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_LISTA_PRECIOS, body, {headers: headers});
  }

  borrarListaDePrecio(nombre: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    return this.http.delete(URL_LISTA_PRECIOS + "/list/" + nombre, {headers: headers})
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_LISTA_PRECIOS + "/" + body._id, body, {headers: headers});
  }

  modificarNombre(body: any): Observable<ElementoListaDePrecios[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_LISTA_PRECIOS + "/list/" + body.actualName, body, {headers: headers})
                    .map((response:Response) => response.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}