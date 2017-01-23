import { Component, Input } from '@angular/core';
import { IndexService } from './indexService';
import { URL_VIEW_CLIENTES} from '../rutas';

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

  onEnter() { console.log("TOCASTE ENTER!!!"); this.ingresar() }

  loginValido(permisos: string){
  	console.log("OK log!!!");
    sessionStorage.setItem("dataLogin", JSON.stringify({nombreUsuario: this.nombreUsuario, permisos: permisos}));
    console.log("RUTA= " + URL_VIEW_CLIENTES);
    location.href = URL_VIEW_CLIENTES;
  }

  onKeyName(value: string) { // with type info
    this.nombreUsuario = value;
  }

  onKeyPass(value: string) { // with type info
    this.contraseniaUsuario = value;
  }
}