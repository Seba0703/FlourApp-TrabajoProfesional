import { Component, Input } from '@angular/core';
import { IndexService } from './indexService';

@Component({
  selector: 'index-app',
  templateUrl: 'app/app_index/indexTemplate.html'
})

export class IndexComponent {
	nombreUsuario = '';
	contraseniaUsuario = '';

	constructor(private indexSrv:IndexService){}

	ingresar() {
		console.log("INGRESANDO");
    console.log(this.nombreUsuario + "-" + this.contraseniaUsuario);
		let usuarioExistente: boolean = true;
		console.log(this.indexSrv.usuarios);	
		for (let usuario of this.indexSrv.usuarios) {
    		if (this.nombreUsuario == usuario.nombre && this.contraseniaUsuario == usuario.contrasenia){
    			this.loginValido();
    		} else {
    			usuarioExistente = false;
    		}
		}

		if (usuarioExistente == false) {
			console.log("ERROR log!!!");
      alert("Usuario y/o contraseña invalido");
		}
   }

  loginValido(){
  	console.log("OK log!!!");
    location.href = "http://localhost:3000/home";
  }

  onKeyName(value: string) { // with type info
    this.nombreUsuario = value;
  }

  onKeyPass(value: string) { // with type info
    this.contraseniaUsuario = value;
  }
}