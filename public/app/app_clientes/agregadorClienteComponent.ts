import { Component } from '@angular/core';
import { ClienteServices } from './clienteServices';

@Component({
  selector: 'agregar-clientes',
  templateUrl: 'app/app_clientes/agregadorClienteComponent.html'
})

export class AgregadorClienteComponent {
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscalID: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPagoID: string;

  constructor(private ptService: ClienteServices){}

  agregar() {
    let cliente = {
        nombreEmpresa:    	this.nombreEmpresa,
        cuit:            	this.cuit,
        categoriaFiscalID:  this.categoriaFiscalID,
        listaPrecioID:      this.listaPrecioID,
        direccion:          this.direccion,
        condicionPagoID:    this.condicionPagoID
    }
    
    console.log(cliente);

    this.ptService.agregarCliente(cliente)
                  .subscribe(data => {
                      console.log("cliente creado!!!");
                      console.log(data);
                      alert("¡Cliente agregado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                  }, error => {
                      console.log(JSON.stringify(error.json()));
                      alert("ERROR al agregar ¡Cliente, revise los campos");
                  });;

  }

}