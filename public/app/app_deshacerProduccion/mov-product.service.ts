import { Injectable } from '@angular/core';
import { MovProductoFinal } from './mov-product-final';
import { MovProductoUsado } from './mov-product-Usado';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL_MOV_PROD_FINAL} from '../rutas';
import {URL_MOV_PROD_USADO} from '../rutas';
import {URL_MOV_PROD_USADO_FINAL} from '../rutas';

@Injectable()
export class MovProductService {
	
	private headers = new Headers({'Content-Type': 'application/json'});
	
	constructor(private http: Http) { }
	
	getProductsFinal(): Promise<MovProductoFinal[]> {
     return this.http.get(URL_MOV_PROD_FINAL)
               .toPromise()
               .then(response => response.json() as MovProductoFinal[])
               .catch(this.handleError);
	}
	
	getProductsUsado(id: string): Promise<MovProductoUsado[]> {
     return this.http.get(URL_MOV_PROD_USADO_FINAL + '/' + id)
               .toPromise()
               .then(response => response.json() as MovProductoUsado[])
               .catch(this.handleError);
	}
	
	deleteProductFinal(id: string): Promise<void> {
		return this.http.delete(URL_MOV_PROD_FINAL + '/' + id)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
	
	postMovimientoFinal(producto: any): Promise<MovProductoFinal> {
		return this.http.post(URL_MOV_PROD_FINAL, JSON.stringify(producto), {headers: this.headers})
			.toPromise()
			.then(response => response.json() as MovProductoFinal)
			.catch(this.handleError);
	}
	
	postMovimientoUsado(producto: any): Promise<void> {
		return this.http.post(URL_MOV_PROD_USADO, JSON.stringify(producto), {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}
  
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
  
}
