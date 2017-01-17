import { Component } from '@angular/core';
//import { ClienteServices } from './clienteServices';

@Component({
  selector: 'agregar-clientes',
  templateUrl: 'app/app_clientes/agregadorClienteComponent.html'
})

export class AgregadorClienteComponent {
  private nombre: string;
  private cuit: string;
  private direccion: string;

  guardar() {
    console.log(this.nombre + "-" + this.cuit + "-" + this.direccion );
  }

}