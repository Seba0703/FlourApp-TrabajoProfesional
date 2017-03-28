import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Cliente } from '../app_clientes/cliente';
import { FacturaVenta } from './FacturaVenta';
import { Producto } from './Producto';

import { FacturaVentaServices } from './FacturaVentaServices';

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

  private facturasVentaDisponibles: FacturaVenta[];
  private facturaVenta: FacturaVenta;

  private estadoLabelClientes: string;

  private clientesDisponibles: Cliente[];

  private productosDisponibles: Array<any>;

  constructor(
    private fvService: FacturaVentaServices,
  	private cService: ClienteServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    
    this.facturaVenta = new FacturaVenta();
    this.productosDisponibles = new Array<any>();
    this.facturasVentaDisponibles = [];
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
  				 	clientes => {
               this.clientesDisponibles = clientes; 
               console.log(this.clientesDisponibles);
               this.cargarFacturasVentaDisponibles();
             },
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  cargarFacturasVentaDisponibles(){
    console.log("CARGANDO FACTURAS DISPONIBLES= ");
    this.fvService.getFacturas()
           .subscribe( 
             fvDisponibles => {
               for (let fv of fvDisponibles){
                for (var i = 0; i < this.clientesDisponibles.length; ++i) {
                  if(fv.clienteID == this.clientesDisponibles[i]._id) {
                    let cliente = this.clientesDisponibles[i]
                    
                    this.fvService
                    .getProductosDeLaFacturaID(fv._id)
                    .subscribe(productos => {
                      console.log("PRODUCTOS GUARDADOS")
                      console.log(productos)
                      this.facturasVentaDisponibles.push(new FacturaVenta(fv._id, fv.fechaEmision, cliente, productos))
                      console.log(this.facturasVentaDisponibles)
                    })
                  }
                }
               }
               
             },
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

  crearFactura(){
    this.facturaVenta = new FacturaVenta()
  }


  seleccionarFacturaParaModificar(factura: FacturaVenta){
    this.facturaVenta = factura;
    this.facturaVenta.fecha = new Date(factura.fecha)//la asingnacion anterior no funciona para fecha
    console.log("PROCESANDO FACTURA=")
    console.log(this.facturaVenta)

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

  fueSeleccionado(cliente: Cliente){
    return this.facturaVenta.cliente == cliente
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

  elProductoFueSeleccionado(producto: Producto){
    for (let prodSeleccionado of this.facturaVenta.productos){
      if(producto.nombre == prodSeleccionado.nombre) {
        return true
      }
    }
    return false
  }

  actualizarProductosSeleccionados(){
    for(var i = 0; i < this.facturaVenta.productos.length; ++i){
      for (var j = 0; j < this.productosDisponibles.length; ++j) {
        if (this.facturaVenta.productos[i].nombre == this.productosDisponibles[j].nombre) {
          this.facturaVenta.productos[i].precioVenta = this.productosDisponibles[j].precioVenta;
        }
      }
    }
  }

  onSeleccionProductoChange(producto: any, valorCheck: boolean){
  	if(valorCheck == true) { 
  		this.facturaVenta.productos.push(new Producto(null, "unTipo", producto.nombre, 1, producto.precioVenta, this.getIVA(producto)));
  	} else {
  		let index = 0;
  		for(let productoSeleccionado of this.facturaVenta.productos){
  			if(producto.nombre == productoSeleccionado.nombre) {
  				this.facturaVenta.productos.splice(index, 1);
  			} else {
  				index++;
  			}
  		}
  	}
  	
  	console.log(this.facturaVenta.productos)
  }

  getIndex(producto: Producto): number{
    let index = 0;
    for(let productoSeleccionado of this.facturaVenta.productos){
      if(producto.nombre == productoSeleccionado.nombre) {
        return index
      }

      index++
    }
  }

/*  onCantidadChange(producto: any, cantidad: number){
  	for (var i = 0; i < this.facturaVenta.productos.length; ++i) {
  		if(this.facturaVenta.productos[i].nombre == producto.nombre) {
  			this.facturaVenta.productos[i].cantidad = cantidad
  		}
  	}
  }*/

/*  onPrecioChange(producto: any, precio: number){
  	for (var i = 0; i < this.facturaVenta.productos.length; ++i) {
  		if(this.facturaVenta.productos[i].nombre == producto.nombre) {
  			this.facturaVenta.productos[i].precioVenta = precio
  		}
  	}
  }*/

/*  onIVAChange(producto: any, iva: number){
    for (var i = 0; i < this.facturaVenta.productos.length; ++i) {
      if(this.facturaVenta.productos[i].nombre == producto.nombre) {
        this.facturaVenta.productos[i].iva = iva
      }
    }
  }*/

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

  getImporte(): number {
    return this.facturaVenta.getImporte()
  }

  borrar(numeroFactura: number){
  }

  guardarFactura(){
    console.log(this.facturaVenta)

    let bodyFacturaVenta = {
      tipoFactura: "C",
      fechaEmision: this.facturaVenta.fecha,
      clienteID:  this.facturaVenta.cliente._id
    }

    console.log(bodyFacturaVenta)

    this.fvService
    	.agregarFactura(bodyFacturaVenta)
    	.subscribe( 
	    	fvAgregada => {
	    		console.log(fvAgregada)

				let bodyProducto = {}
				for(let producto of this.facturaVenta.productos){
					bodyProducto = {
						tipo:     	 "tipo",
			  			nombre:      producto.nombre,
			  			cantidad:    producto.cantidad,
			  			precio:      producto.precioVenta,
			  			iva:		 producto.iva,
			  			facturaID:	 fvAgregada._id
					}

					console.log("VINCULANDO PRODUCTO")
					console.log(bodyProducto)

					this.fvService.vincularProducto(bodyProducto).subscribe()

				}
	    	},
	    	err => console.error("EL ERROR FUE: ", err));


  }

  agregarCliente(){

  }

}
