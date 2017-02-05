import { Injectable } from '@angular/core';
import { RequiredProduct } from './required-product';
import { Headers, URLSearchParams, Http } from '@angular/http';
import { URL_LISTA_PORCENTAJES_CON_DATOS } from '../rutas';

@Injectable()
export class RequiredProductService {

  constructor(private http: Http) { }

  getRequiredProducts(id: string): Promise<RequiredProduct[]> {
     return this.http.get(URL_LISTA_PORCENTAJES_CON_DATOS + '/' + id)
               .toPromise()
               .then(response => response.json() as RequiredProduct[])
               .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}

