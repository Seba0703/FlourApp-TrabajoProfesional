import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteServices {
  public clientes: Array<any>;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO CLIENTES SERVIRCE");
  	this.cargarClientes();
  }

  cargarClientes() {
  	console.log("HACIENDO REQUEST");
  	this.http.get('http://localhost:3000/api/clientes')
  		.map(response => response.json())
  		.subscribe(
  			clientesData => this.clientes = clientesData,
  			err => console.error("EL ERROR FUE: ", err)
  		);

  	console.log("FIN REQUEST");	
  }

	private mostrar(): void{
		console.log(this.clientes);	
	}
}