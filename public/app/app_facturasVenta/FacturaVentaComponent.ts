import { Component, OnInit } from '@angular/core';

import { Cliente } from '../app_clientes/cliente';
import { FacturaVenta } from './FacturaVenta';
import { Producto } from './Producto';

import { ClienteServices } from '../app_clientes/clienteServices';
import { ListaDePrecioServices } from '../app_listaDePrecios/ListaDePrecioServices';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';


@Component({
  selector: 'factura-venta-component',
  templateUrl: "app/app_facturasVenta/facturaVentaComponent.html"
})
export class FacturaVentaComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  public clickedDatepicker: boolean = false;

  private facturaVenta: FacturaVenta;

  private estadoLabelClientes: string;

  private clientesDisponibles: Cliente[];

  private productosDisponibles: Array<any>;
  private productosSeleccionados: Array<Producto>;

  constructor(
  	private cService: ClienteServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    
    this.facturaVenta = new FacturaVenta();
    this.productosDisponibles = new Array<any>();
    this.productosSeleccionados = new Array<Producto>();
  }

  ngOnInit() {
    console.log("ON INIT");

    this.estadoLabelClientes = "Ver";
    this.cargarClientesDisponibles();
    this.cargarProductosDisponibles();
  }

  cargarClientesDisponibles(){
  	this.cService.getBasicDataClientes()
  				 .subscribe( 
  				 	clientes => {this.clientesDisponibles = clientes; console.log(this.clientesDisponibles)},
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  cargarProductosDisponibles(){
    this.mpService.getBasicDataMateriasPrima()
            .subscribe(
              materiasPrimas => {
                this.productosDisponibles.push.apply(this.productosDisponibles, materiasPrimas);

                this.spService.getBasicDataSemiProcesados()
                        .subscribe(
                          sp => {
                            this.productosDisponibles.push.apply(this.productosDisponibles, sp);

                            this.ptService.getBasicDataProductosTerminados()
                                    .subscribe(
                                      pt => {
                                        this.productosDisponibles.push.apply(this.productosDisponibles, pt);

                                        console.log("PRODUCTOS DISPONIBLES CARGADOS= ");
                                        console.log(this.productosDisponibles);
                                      }
                                        ,
                                      err => console.error("EL ERROR FUE: ", err)
                                    );
                          }
                            ,
                          err => console.error("EL ERROR FUE: ", err)
                        );
              }
                ,
              err => console.error("EL ERROR FUE: ", err)
            );

  }

  public toggleDP():boolean {
    this.clickedDatepicker = !this.clickedDatepicker;
    return !this.clickedDatepicker;
  }

  cambiarEstado(){
    if(this.estadoLabelClientes == "Ver") { 
      this.estadoLabelClientes = "Ocultar"
    } else {
      this.estadoLabelClientes = "Ver"
    }
  }

  onSeleccionClienteChange(cliente: Cliente){
  	console.log(cliente);

    this.facturaVenta.cliente = cliente;

    if(cliente.listaPrecioNombre != null) {
	    this.ldpService.getListaDePreciosByName(cliente.listaPrecioNombre)
	    			   .subscribe(listaDePrecios => {
	    			   		console.log(listaDePrecios)
	    			   		for(let elemento of listaDePrecios){
  							  	for (var i = 0; i < this.productosDisponibles.length; ++i) {
    									if (this.productosDisponibles[i]._id == elemento.mp_ID
    										|| this.productosDisponibles[i]._id == elemento.sp_ID 
    										|| this.productosDisponibles[i]._id == elemento.pt_ID) {

    											this.productosDisponibles[i].precioVenta = elemento.precio;

                          
    									}
  							  	}
	    			   		}

                  this.actualizarProductosSeleccionados();
                   
	    			   		console.log("PRODUCTOS DISPONIBLES ACTUALIZADOS POR LPD= ");
                  console.log(this.productosDisponibles);
	    			   })
    }

  }

  actualizarProductosSeleccionados(){
    for(var i = 0; i < this.productosSeleccionados.length; ++i){
      for (var j = 0; j < this.productosDisponibles.length; ++j) {
        if (this.productosSeleccionados[i]._id == this.productosDisponibles[j]._id) {
          this.productosSeleccionados[i].precioVenta = this.productosDisponibles[j].precioVenta;
        }
      }
    }
  }

  onSeleccionProductoChange(producto: any, valorCheck: boolean){
  	if(valorCheck == true) { 
  		this.productosSeleccionados.push(new Producto(producto._id, producto.nombre, 0, producto.precioVenta, this.getIVA(producto)));
  	} else {
  		let index = 0;
  		for(let productoSeleccionado of this.productosSeleccionados){
  			if(productoSeleccionado._id == producto._id) {
  				this.productosSeleccionados.splice(index, 1);
  			} else {
  				index++;
  			}
  		}
  	}
  	
  	console.log(this.productosSeleccionados)
  }

  onCantidadChange(productoID: string, cantidad: number){
  	for (var i = 0; i < this.productosSeleccionados.length; ++i) {
  		if(this.productosSeleccionados[i]._id == productoID) {
  			this.productosSeleccionados[i].cantidad = cantidad
  		}
  	}
  }

  onPrecioChange(productoID: string, precio: number){
  	for (var i = 0; i < this.productosSeleccionados.length; ++i) {
  		if(this.productosSeleccionados[i]._id == productoID) {
  			this.productosSeleccionados[i].precioVenta = precio
  		}
  	}
  }

  onIVAChange(productoID: string, iva: number){
    for (var i = 0; i < this.productosSeleccionados.length; ++i) {
      if(this.productosSeleccionados[i]._id == productoID) {
        this.productosSeleccionados[i].iva = iva
      }
    }
  }

  getIVA(producto: any): number {
    switch (producto.tasaImpositivaID) {
      case "ti1":
        return 0;
      case "ti2":
        return 10.5;  
      case "ti3":
        return 21;
      case "ti4":
        return 27;  
      default:
        return 0;
    }
  }

  getTotal(): number {
    let total: number = 0
    for (let productoSeleccionado of this.productosSeleccionados){
      total += (productoSeleccionado.cantidad * productoSeleccionado.precioVenta)
    }

    //console.log(total)

    return total;
  }

  borrar(numeroFactura: number){
  }

  guardarFactura(){
    console.log(this.facturaVenta)
  }

  agregarCliente(){

  }

}
