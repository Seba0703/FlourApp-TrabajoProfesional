import { Component } from '@angular/core';
//import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'agregar-proveedores',
  templateUrl: 'app/app_proveedores/agregadorProveedorComponent.html'
})

export class AgregadorProveedorComponent {
  private nombre: string;
  private cuit: string;
  private direccion: string;

  guardar() {
    console.log(this.nombre + "-" + this.cuit + "-" + this.direccion );
  }

}