import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MateriaPrimaServices {
  public materiaPrimas: Array<any>;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO MateriaPrimaS SERVIRCE");
  	this.cargarMateriasPrima();
  }

  cargarMateriasPrima() {
  	console.log("HACIENDO REQUEST");
  	this.http.get('http://localhost:3000/api/materiasPrima')
  		.map(response => response.json())
  		.subscribe(
  			materiaPrimasData => this.materiaPrimas = materiaPrimasData,
  			err => console.error("EL ERROR FUE: ", err)
  		);

  	console.log("FIN REQUEST");	
  }

	private mostrar(): void{
		console.log(this.materiaPrimas);	
	}
}