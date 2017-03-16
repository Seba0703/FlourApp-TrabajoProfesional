import { Component, OnInit } from '@angular/core';

import { Cliente } from '../app_clientes/cliente';
import { FacturaVenta } from './FacturaVenta';

import { ClienteServices } from '../app_clientes/clienteServices';

@Component({
  selector: 'factura-venta-component',
  templateUrl: "app/app_facturasVenta/facturaVentaComponent.html"
})

export class FacturaVentaComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  private facturaVenta: FacturaVenta;

  private nombre: string = "hola";

  private clientesDisponibles: Cliente[];
  private clienteSeleccionado: Cliente;

  private mostrarClientesModal: boolean;
  private mostrarFacturaVentaModal: boolean;

  constructor(
  	private cService: ClienteServices){
    this.facturaVenta = new FacturaVenta();
    //this.facturaVenta.cliente.nombreEmpresa = "papanata";
  	//this.clientesDisponibles = new Array<any>();
  }

  ngOnInit() {
    console.log("ON INIT");

    this.cargarClientesDisponibles();
  }

  cargarClientesDisponibles(){
    this.mostrarClientesModal = true;
  	this.cService.getBasicDataClientes()
  				 .subscribe( 
  				 	clientes => {this.clientesDisponibles = clientes; console.log(this.clientesDisponibles)},
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  mostrarFacturaModal(mostrar: boolean){
    if(mostrar) {
      this.mostrarFacturaVentaModal = true;
    } else {
      this.mostrarFacturaVentaModal = false;
      //this.ocultarFacturaModal = true;
      //this.mostrarClientesModal = true;
    }
    
  }

  onClienteSelecionadoChange(cliente: Cliente){
  	console.log(cliente);
    this.facturaVenta.cliente = cliente;
  }

  ocultarClientesModal(){
    //this.mostrarClientesModal = false;
    this.mostrarFacturaVentaModal = true;
  }

  borrar(numeroFactura: number){
  }

  guardarFactura(){

  }

  agregarCliente(){

  }

}
