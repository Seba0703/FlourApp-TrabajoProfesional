import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_DOCUMENTOS_MERCANTILES} from '../rutas';
import {URL_INFORME_ESTADO} from '../rutas';

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
    params = params.slice(0, -1)
    if(params!="")
      params = "?" + params;
    return this.http.get(URL_DOCUMENTOS_MERCANTILES+"/facturas"+params).map((response) => response.json());
  }

  getEstadoStock() {
    return this.http.get(URL_INFORME_ESTADO).map((response) => response.json());
  }
}
