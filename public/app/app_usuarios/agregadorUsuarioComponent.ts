import { Component } from '@angular/core';
import { UsuarioServices } from './usuarioServices';

@Component({
  selector: 'agregar-usuario',
  templateUrl: 'app/app_usuarios/agregadorUsuarioComponent.html'
})

export class AgregadorUsuarioComponent {
  private nombre: string;
  private contrasenia: string;
  private permisos: string;

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: UsuarioServices){}

  agregar() {

    if(this.nombre){

      let usuario = {
          nombre:      this.nombre,
          contrasenia:               this.contrasenia,
          permisos:    this.permisos,
      }
      
      console.log(usuario);

      this.ptService.agregarUsuario(usuario)
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
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }

}