import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {URL_INFORMEVENTAS} from '../rutas';

@Injectable()
export class InformeVentasServices{
  // public informeVentas: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO InformeVentas SERVIRCE");
  }
}
