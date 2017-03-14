import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { InformeCompras } from './informeCompras';
import {URL_INFORMECOMPRAS} from '../rutas';

@Injectable()
export class InformeComprasServices{
  public informeCompras: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO InformeCompras SERVIRCE");
  }
}
