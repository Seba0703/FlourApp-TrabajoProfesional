import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URL_RETENCIONES} from '../rutas';
import {Retencion} from "./retencion";

@Injectable()
export class RetencionServices {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getRetenciones(): Promise<Retencion[]>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_RETENCIONES)
        .toPromise()
        .then(response => response.json() as Retencion[])
        .catch(this.handleError);
  }

  addRetencion(retencion: Retencion): Promise<Retencion> {
    console.log("POST REQUEST");
    return this.http.post(URL_RETENCIONES,  JSON.stringify(retencion), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Retencion)
        .catch(this.handleError);
  }

  deleteRetencion(id: string): Promise<void> {

    console.log("DELETE REQUEST");
    return this.http.delete(URL_RETENCIONES + "/" + id, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);;
  }

  modificar(retencion: Retencion): Promise<Retencion> {
    console.log("PUT REQUEST");
    return this.http.put(URL_RETENCIONES + "/" + retencion._id, JSON.stringify(retencion), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Retencion)
        .catch(this.handleError);;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}