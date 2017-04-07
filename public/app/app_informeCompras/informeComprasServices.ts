import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_DOCUMENTOS_MERCANTILES} from '../rutas';

@Injectable()
export class InformeComprasServices{
  // public informeCompras: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO InformeCompras SERVIRCE");
  }
}
