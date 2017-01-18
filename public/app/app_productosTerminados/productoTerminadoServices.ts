import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductoTerminadoServices {
  public productosTerminados: Array<any>;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO ProductoTerminadoS SERVIRCE");
  	this.cargarProductosTerminados();
  }

  cargarProductosTerminados() {
  	console.log("HACIENDO REQUEST");
  	this.http.get('http://localhost:3000/api/productosTerminados')
  		.map(response => response.json())
  		.subscribe(
  			productosTerminadosData => this.productosTerminados = productosTerminadosData,
  			err => console.error("EL ERROR FUE: ", err)
  		);

  	console.log("FIN REQUEST");	
  }

	private mostrar(): void{
		console.log(this.productosTerminados);	
	}
}