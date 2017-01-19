import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';

const URL_CLIENTES = 'http://localhost:3000/api/clientes';

@Injectable()
export class ClienteServices {
  private clientes: Array<any>;

  constructor(private http:Http) {
    console.log("INICIALIZANDO ClienteS SERVIRCE");
  }

  getClientes(): Observable<Response>  {
    console.log("HACIENDO REQUEST");
    return this.http.get(URL_CLIENTES).map((response) => response.json())
  }

  agregarCliente(body: Object): Observable<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("POST REQUEST");
    return this.http.post(URL_CLIENTES, body, {headers: headers});
  }

	private mostrar(): void{
		console.log(this.clientes);	
	}
}