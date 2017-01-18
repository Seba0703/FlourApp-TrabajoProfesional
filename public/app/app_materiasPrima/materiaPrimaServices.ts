import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SemiProcesadoServices {
  public semiProcesados: Array<any>;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO SemiProcesadoS SERVIRCE");
  	this.cargarMateriasPrima();
  }

  cargarMateriasPrima() {
  	console.log("HACIENDO REQUEST");
  	this.http.get('http://localhost:3000/api/materiasPrima')
  		.map(response => response.json())
  		.subscribe(
  			semiProcesadosData => this.semiProcesados = semiProcesadosData,
  			err => console.error("EL ERROR FUE: ", err)
  		);

  	console.log("FIN REQUEST");	
  }

	private mostrar(): void{
		console.log(this.semiProcesados);	
	}
}