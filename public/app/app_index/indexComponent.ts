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
          this.loginValido(usuario.permisos);
          break;
    		}
		}

		if (usuarioExistente == false) {
			console.log("ERROR log!!!");
      alert("Usuario y/o contraseña invalido");
		}
   }

  loginValido(permisos: string){
  	console.log("OK log!!!");
    sessionStorage.setItem("dataLogin", JSON.stringify({nombreUsuario: this.nombreUsuario, permisos: permisos}));
    location.href = "http://localhost:3000/clientes.html";
  }

  onKeyName(value: string) { // with type info
    this.nombreUsuario = value;
  }

  onKeyPass(value: string) { // with type info
    this.contraseniaUsuario = value;
  }
}