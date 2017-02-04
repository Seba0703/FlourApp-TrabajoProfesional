import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Headers, URLSearchParams, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL_MATERIAS_PRIMA} from '../rutas';
import {URL_SEMIPROCESADOS} from '../rutas';
import {URL_PRODUCTOS_TERMINADOS} from '../rutas';
import {URL_MATERIAS_PRIMA_STOCK} from '../rutas';
import {URL_SEMIPROCESADOS_STOCK} from '../rutas';
import {URL_PRODUCTOS_TERMINADOS_STOCK} from '../rutas';


@Injectable()
export class ProductService {
	
  private headers = new Headers({'Content-Type': 'application/json'});
	
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
  
  putNewStock(producto: any): Promise<void> {
	var pruductURL: string;
	if(producto.tipo == 1) {
		pruductURL = URL_MATERIAS_PRIMA_STOCK;
	} else if(producto.tipo == 2) {
		pruductURL = URL_SEMIPROCESADOS_STOCK;
	} else {
		pruductURL = URL_PRODUCTOS_TERMINADOS_STOCK;
	}
	
    return this.http.put(pruductURL, JSON.stringify(producto),{headers: this.headers})
              .toPromise()	
              .then(() => null)
              .catch(this.handleError);
  }
  
  canPutNewStock(producto: any): Promise<void> {
	var pruductURL: string;
	if(producto.tipo == 1) {
		pruductURL = URL_MATERIAS_PRIMA_STOCK;
	} else if(producto.tipo == 2) {
		pruductURL = URL_SEMIPROCESADOS_STOCK;
	} else {
		pruductURL = URL_PRODUCTOS_TERMINADOS_STOCK;
	}
	
	let params: URLSearchParams = new URLSearchParams();
	params.set('id', producto._id);
	params.set('add', producto.add);
	params.set('cant', producto.cant);
	
    return this.http.get(pruductURL, {search: params} )
              .toPromise()	
              .then(() => null)
              .catch(this.handleError);
  }
  
   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
