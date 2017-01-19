import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

const URL_SEMIPROCESADO = 'http://localhost:3000/api/semiProcesados';

@Injectable()
export class SemiProcesadoServices{
  public semiProcesados: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO SemiProcesadoS SERVIRCE");
    //this.cargarProductosTerminados();
  }

  getSemiProcesados(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_SEMIPROCESADO).map((response) => response.json())
  }

  agregarSemiProcesado(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_SEMIPROCESADO, body, {headers: headers});
  }

  private mostrar(): void{
    console.log(this.semiProcesados);  
  }
}