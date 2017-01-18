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
		let usuarioExistente: boolean = false;
		console.log(this.indexSrv.getUsuarios());	
		for (let usuario of this.indexSrv.getUsuarios()) {
    		if (this.nombreUsuario == usuario.nombre && this.contraseniaUsuario == usuario.contrasenia){
    			usuarioExistente = true;
          this.loginValido();
          break;
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