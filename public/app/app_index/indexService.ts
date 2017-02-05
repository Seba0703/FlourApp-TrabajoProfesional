import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {URL_USUARIOS} from '../rutas'
import 'rxjs/add/operator/map';

@Injectable()
export class IndexService {
  private usuarios: Array<any>;
  private home: any;

  constructor(private http:Http) {
  	console.log("INICIALIZANDO INDEX SERVIRCE");
  	this.cargarUsuarios();
  }

  cargarUsuarios() {
  	console.log("HACIENDO REQUEST");
  	this.http.get(URL_USUARIOS)
  		.map((response) => response.json())
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

    //this.testRequest();
  }

	private mostrar(): void{
		console.log(this.usuarios);	
	}

  public getUsuarios(): Array<any> {
    return this.usuarios;
  }

  testRequest() {
      var body = {
        nombre: "juan",
        contrasenia: "123",
        permisos: "all"        
      };
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http
        .post(URL_USUARIOS,
              body, 
              {
                headers: headers
              })
              .subscribe(data => {
                  console.log("usuario creado!!!");  
              }, error => {
                  console.log(JSON.stringify(error.json()));
              });
  }
}