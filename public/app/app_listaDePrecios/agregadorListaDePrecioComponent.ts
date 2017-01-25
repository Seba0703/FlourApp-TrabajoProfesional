import { Component } from '@angular/core';
import { ListaDePrecioServices } from './listaDePrecioServices';

@Component({
  selector: 'agregar-listaDePrecios',
  templateUrl: 'app/app_listaDePrecios/agregadorListaDePrecioComponent.html'
})

export class AgregadorListaDePrecioComponent {
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscal: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPago: string;

  private mostrarModalAgregar: boolean = true;

  constructor(private lpService: ListaDePrecioServices){}

  agregar() {

    if(this.nombreEmpresa){

      let listaDePrecio = {
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscal:    this.categoriaFiscal,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPago:    this.condicionPago
      }
      
      console.log(listaDePrecio);

      this.lpService.agregarListaDePrecio(listaDePrecio)
                    .subscribe(data => {
                        console.log("listaDePrecio creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("\t\t\t\t¡ListaDePrecio agregado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al agregar ListaDePrecio!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }

}