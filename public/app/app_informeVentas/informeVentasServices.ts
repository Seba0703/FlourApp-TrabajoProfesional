import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_DOCUMENTOS_MERCANTILES} from '../rutas';
import {URL_CLIENTES} from '../rutas';

@Injectable()
export class InformeVentasServices{
  // public informeVentas: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO InformeVentas SERVIRCE");
  }

  getFacturas() {
    //console.log("HACIENDO REQUEST");
    console.log("Hola informeVentasServices");
    return this.http.get(URL_DOCUMENTOS_MERCANTILES).map((response) => response.json());
  }
}
