import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IndexService {
  public usuarios: Array<any>;
  public home: any;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO INDEX SERVIRCE");
  	this.cargarUsuarios();
  }

  cargarUsuarios() {
  	console.log("HACIENDO REQUEST");
  	this.http.get('http://localhost:3000/api/usuarios')
  		.map(response => response.json())
  		.subscribe(
  			usuariosData => this.usuarios = usuariosData,
  			err => console.error("EL ERROR FUE: ", err)
  		);

    this.http.get('http://localhost:3000/home')
    .map(response => response)
    .subscribe(
      homeData => this.home = homeData,
      err => console.error("EL ERROR FUE: ", err)
    );

  	console.log("FIN REQUEST");	
  }

	private mostrar(): void{
		console.log(this.usuarios);	
	}
}