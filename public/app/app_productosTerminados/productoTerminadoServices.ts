import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ComponenteSeleccionado } from '../listaPorcentaje/componenteSeleccionado';
import { ListaPorcentajeServices } from '../listaPorcentaje/ListaPorcentajeServices'

import { ProductoTerminado } from './productoTerminado';
import {URL_PRODUCTOS_TERMINADOS} from '../rutas';

@Injectable()
export class ProductoTerminadoServices{
  public productosTerminados: Array<any>;

  constructor(private http:Http, private lpService: ListaPorcentajeServices) {
  	console.log("INICIALIZANDO ProductoTerminadoS SERVIRCE");
  }

  getProductosTerminados(): Observable<Response>  {
  	console.log("HACIENDO REQUEST");
  	return this.http.get(URL_PRODUCTOS_TERMINADOS).map((response) => response.json())
  }

  getBasicDataProductosTerminados(): Observable<ProductoTerminado[]> {
    return this.http.get(URL_PRODUCTOS_TERMINADOS).map((response) => response.json())
  }

  getComponentesSeleccionados(idProducto: string): Observable<ComponenteSeleccionado[]>{
    return this.lpService.getListaPorcentajesByIDproductoNecesario(idProducto)
                  .map(datosInDataBase => datosInDataBase)
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  agregarProductoTerminado(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_PRODUCTOS_TERMINADOS, body, {headers: headers});
  }

  agregarComponente(body: Object) : Observable<Response> {
    return this.lpService.agregarComponente(body);
  }

  borrarProductoTerminado(id: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log("CALLING LP SERVICE TO DELETE COMPONENTS ...");
    this.lpService.borrarListaPorcentajes(id)
                  .subscribe(()=>{}, (error:any) => Observable.throw(error.json().error || 'Server error'))

    console.log("DELETE PROD TERMINADO ...");
    return this.http.delete(URL_PRODUCTOS_TERMINADOS + "/" + id, {headers: headers});
  }

  borrarComponentes(productoAfabricarID: string): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("CALLING LP SERVICE TO DELETE COMPONENTS ...");
    return this.lpService.borrarListaPorcentajes(productoAfabricarID)
  }

  modificar(body: any): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_PRODUCTOS_TERMINADOS + "/" + body._id, body, {headers: headers});
  }
}