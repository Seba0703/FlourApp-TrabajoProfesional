import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_DOCUMENTOS_MERCANTILES} from '../rutas';
import {URL_INFORME_ESTADO} from '../rutas';
import {URL_INFORME_PRECIOS} from '../rutas';
import {URL_MATERIAS_PRIMA} from '../rutas';
import {URL_SEMIPROCESADOS} from '../rutas';
import {URL_PRODUCTOS_TERMINADOS} from '../rutas';

@Injectable()
export class InformesServices{
  constructor(private http:Http) {
    console.log("INICIALIZANDO Informes SERVIRCE");
  }

  getFacturas(searchFields:any) {
    var params = "";
    for (var key in searchFields) {
      if(searchFields[key] != undefined && searchFields[key] != "")
        params += key + "=" + searchFields[key] + "&";
    }
    params = params.slice(0, -1);
    if(params!="")
      params = "?" + params;
    return this.http.get(URL_DOCUMENTOS_MERCANTILES+"/facturas"+params).map((response) => response.json());
  }

  getEstadoStock() {
    return this.http.get(URL_INFORME_ESTADO).map((response) => response.json());
  }

  getEstadoPrecios(producto:any, searchFields:any) {
    var params = "";
    for (var key in searchFields) {
      if(searchFields[key] != undefined && searchFields[key] != "")
        params += key + "=" + searchFields[key] + "&";
    }
    params = params.slice(0, -1);
    if(params!="")
      params = "?" + params;
    return this.http.get(URL_INFORME_PRECIOS+'/'+producto._id+params).map((response) => response.json());
  }

  getMateriasPrima() {
    return this.http.get(URL_MATERIAS_PRIMA).map((response) => response.json());
  }

  getSemiProcesados() {
    return this.http.get(URL_SEMIPROCESADOS).map((response) => response.json());
  }

  getProductosTerminados() {
    return this.http.get(URL_PRODUCTOS_TERMINADOS).map((response) => response.json());
  }

  modificarStockOptimo(body:any) : Observable<Response> {
    console.log(body);

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("PUT REQUEST");
    return this.http.put(URL_INFORME_ESTADO + "/" + body._id, body, {headers: headers});
  }
}
