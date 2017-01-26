import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { UsuarioServices } from './usuarioServices';

@Component({
  selector: 'tabla-usuarios',
  templateUrl: "app/app_usuarios/usuarioComponent.html"
})

export class UsuarioComponent {
  private accionesEjecutables: string;//ejecutables sobre este component

  private usuarios: Response;

  private _id : string;
  private nombre: string;
  private contrasenia: string;
  private permisos: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private uService: UsuarioServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.accionesEjecutables = dataLogin.permisos;
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO CLIENTES");
    // en el momento del subscribe es cuando se dispara la llamada
    this.uService.getUsuarios()
              .subscribe(
                (usuariosData) => {
                  this.usuarios = usuariosData;
                  console.log(this.usuarios);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.uService.borrarUsuario(id)
                      .subscribe(
                        () => { 
                      alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                      },
                        err => console.error("EL ERROR FUE: ", err)
                      );
    } else {
        console.log("You pressed CANCEL!");
    }
  }

  modificar(usuario: any){
    this._id =         usuario._id;
    this.nombre =      usuario.nombre;
    this.contrasenia = usuario.contrasenia;
    this.permisos =    usuario.permisos;
  }

  onSelectionChange(permisosSelecionado: string){
    this.permisos = permisosSelecionado;
  }

  guardarModificaciones(){
    if(this.nombre){
      if(this.nombreSinUsar(this.nombre)) {
        this.mostrarModalModificar = false;
        let usuario = {
            _id:         this._id,
            nombre:      this.nombre,
            contrasenia: this.contrasenia,
            permisos:    this.permisos
        }
        
        console.log(usuario);

        this.uService.modificar(usuario)
                      .subscribe(data => {
                          console.log(data);
                          
                          alert("\t\t\t\t¡Usuario modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                          window.location.reload();                        
                      }, error => {
                          console.log(JSON.stringify(error.json()));
                          alert("\t\t\t\t¡ERROR al modificar Usuario!\n\nRevise los campos");
                      });;
      } else {
        alert("\t\t\t¡ERROR!\n\nYa existe un usuario con ese nombre");
      }

    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
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