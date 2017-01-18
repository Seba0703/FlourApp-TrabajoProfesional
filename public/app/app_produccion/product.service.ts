import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
	private prodUrl = 'api/productos'; 
	
	constructor(private http: Http) { }
	
  getProducts(): Promise<Producto[]> {
     return this.http.get(this.prodUrl)
               .toPromise()
               .then(response => response.json().data as Producto[])
               .catch(this.handleError);
  }
  
   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
