import { Component, OnInit } from '@angular/core';

import { Cliente } from '../app_clientes/cliente';

import { ClienteServices } from '../app_clientes/clienteServices';

@Component({
  selector: 'factura-venta-component',
  templateUrl: "app/app_facturasVenta/facturaVentaComponent.html"
})

export class FacturaVentaComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  private clientesDisponibles: Cliente[];
  private clienteSeleccionado: Cliente;

  constructor(
  	private cService: ClienteServices){
  	//this.clientesDisponibles = new Array<any>();
  }

  ngOnInit() {
    console.log("ON INIT");

    this.cargarClientesDisponibles();
  }

  cargarClientesDisponibles(){
  	this.cService.getBasicDataClientes()
  				 .subscribe( 
  				 	clientes => {this.clientesDisponibles = clientes; console.log(this.clientesDisponibles)},
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  onClienteSelecionadoChange(cliente: Cliente){
  	console.log(cliente);
  }

  borrar(numeroFactura: number){
  }

  guardarFactura(){

  }

  agregarCliente(){

  }

}
