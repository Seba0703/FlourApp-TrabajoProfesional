import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ComponenteSeleccionado } from '../listaPorcentaje/componenteSeleccionado';

import { SemiProcesado } from './semiProcesado';
import { ListaPorcentajeServices } from '../listaPorcentaje/ListaPorcentajeServices'

import {URL_SEMIPROCESADOS} from '../rutas';

@Injectable()
export class SemiProcesadoServices{
  public semiProcesados: Array<any>;

  constructor(private http:Http, private lpService: ListaPorcentajeServices) {
    console.log("INICIALIZANDO SemiProcesadoS SERVIRCE");
  }

  getSemiProcesados(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_SEMIPROCESADOS).map((response) => response.json())
  }

  getBasicDataSemiProcesados(): Observable<SemiProcesado[]> {
    return this.http.get(URL_SEMIPROCESADOS).map((response) => response.json())
  }

  getComponentesSeleccionados(idProducto: string): Observable<ComponenteSeleccionado[]>{
    return this.lpService.getListaPorcentajesByIDproductoNecesario(idProducto)
                  .map(datosInDataBase => datosInDataBase)
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  agregarSemiProcesado(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_SEMIPROCESADOS, body, {headers: headers});
  }

  agregarComponente(body: Object) : Observable<Response> {
    return this.lpService.agregarComponente(body);
  }

  borrarSemiProcesado(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST");
    this.lpService.borrarListaPorcentajes(id)
                  .subscribe(()=>{}, (error:any) => Observable.throw(error.json().error || 'Server error'))
                  
    return this.http.delete(URL_SEMIPROCESADOS + "/" + id, {headers: headers});
  }

  borrarComponentes(productoAfabricarID: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("DELETE REQUEST BY PRODUCTO");
    return this.lpService.borrarListaPorcentajes(productoAfabricarID)
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_SEMIPROCESADOS + "/" + body._id, body, {headers: headers});
  }
}