import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL_SEMIPROCESADOS} from '../rutas';
import {URL_PRODUCTOS_TERMINADOS} from '../rutas';

@Injectable()
export class ProductService {
	
	constructor(private http: Http) { }
	
  getProductsSemi(): Promise<Producto[]> {
     return this.http.get(URL_SEMIPROCESADOS)
               .toPromise()
               .then(response => response.json() as Producto[])
               .catch(this.handleError);
  }
  
  getProductsTerm(): Promise<Producto[]> {
     return this.http.get(URL_PRODUCTOS_TERMINADOS)
               .toPromise()
               .then(response => response.json() as Producto[])
               .catch(this.handleError);
  }
  
   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
