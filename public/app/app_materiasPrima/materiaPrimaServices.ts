import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

const URL_MATERIAS_PRIMA = 'http://localhost:3000/api/materiasPrima';

@Injectable()
export class MateriaPrimaServices{
  public materiasPrima: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO MateriaPrimaS SERVIRCE");
    //this.cargarProductosTerminados();
  }

  getMateriasPrima(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_MATERIAS_PRIMA).map((response) => response.json())
  }

  agregarMateriaPrima(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_MATERIAS_PRIMA, body, {headers: headers});
  }

  private mostrar(): void{
    console.log(this.materiasPrima);  
  }
}