import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { UsuarioServices } from './usuarioServices';

@Component({
  selector: 'agregar-usuario',
  templateUrl: 'app/app_usuarios/agregadorUsuarioComponent.html'
})

export class AgregadorUsuarioComponent {
  private usuarios: Response;

  private nombre: string;
  private contrasenia: string;
  private permisos: string = "lectura";

  private mostrarModalAgregar: boolean = true;

  constructor(private uService: UsuarioServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    console.log("CARGANDO USUARIOS");
    // en el momento del subscribe es cuando se dispara la llamada
    this.uService.getUsuarios()
              .subscribe(
                (usuarios) => {
                  this.usuarios = usuarios;
                  console.log(this.usuarios);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  onSelectionChange(permisosSelecionado: string){
  	this.permisos = permisosSelecionado;
  }

  agregar() {
    if(this.nombre){
      if(this.nombreSinUsar(this.nombre)) {
	      let usuario = {
	          nombre:      this.nombre,
	          contrasenia: this.contrasenia,
	          permisos:    this.permisos,
	      }
	      
	      console.log(usuario);

	      this.uService.agregarUsuario(usuario)
	                    .subscribe(data => {
	                        console.log("usuario creado!!!");
	                        console.log(data);
	                        this.mostrarModalAgregar = false;
	                        alert("\t\t\t\t¡Usuario agregado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
	                        window.location.reload();
	                    }, error => {
	                        console.log(JSON.stringify(error.json()));
	                        alert("\t\t\t\t¡ERROR al agregar Usuario!\n\nRevise los campos");
	                    });;
      } else {
      	alert("\t\t\t¡ERROR!\n\nYa existe un usuario con ese nombre");
      }
    } else {
      alert("\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }

  private nombreSinUsar(nombre: string): boolean{
  	/*IMPORTANTE: lo que hace el codigo es medio raro, pero lo hice asi porque no se puede tratar 
  	al Response como un Array porque el coompilador da error, aunque si lo ejecutas no da error
  	en tiempo de ejecucion*/

  	let users:any = [];

  	console.log("u= " + this.usuarios.toString().split(","));

	var cantUsuarios = this.usuarios.toString().split(",").length;

	console.log("CANT= " + cantUsuarios);

	if(cantUsuarios != 1) {
	    for (var i = 0; i < cantUsuarios; i++) {
	    	users.push(this.usuarios[i]);
	    }

		for (let usuario of users) {
			//console.log(usuario);
			if(nombre == usuario.nombre) {
				return false;
			}
		}
		return true;
	} else {
		return true;
	}
  }

}