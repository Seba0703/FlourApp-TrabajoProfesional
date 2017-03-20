import { Component, OnInit } from '@angular/core';

import { Proveedor } from '../app_proveedores/proveedor';
import { FacturaCompra } from './FacturaCompra';
import { Producto } from './Producto';

import { ProveedorServices } from '../app_proveedores/proveedorServices';
import { ListaDePrecioServices } from '../app_listaDePrecios/ListaDePrecioServices';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';

@Component({
  selector: 'factura-compra-component',
  templateUrl: "app/app_facturasCompra/facturaCompraComponent.html"
})

export class FacturaCompraComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  private facturaCompra: FacturaCompra;

  private estadoLabelProveedores: string;

  private proveedoresDisponibles: Proveedor[];

  private productosDisponibles: Array<any>;
  private productosSeleccionados: Array<Producto>;

  constructor(
  	private pService: ProveedorServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    
    this.facturaCompra = new FacturaCompra();
    this.productosDisponibles = new Array<any>();
    this.productosSeleccionados = new Array<Producto>();
  }

  ngOnInit() {
    console.log("ON INIT");

    this.estadoLabelProveedores = "Ver";
    this.cargarProveedoresDisponibles();
    this.cargarProductosDisponibles();
  }

  cargarProveedoresDisponibles(){
  	this.pService.getBasicDataProveedores()
  				 .subscribe( 
  				 	proveedores => {this.proveedoresDisponibles = proveedores; console.log(this.proveedoresDisponibles)},
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

  cambiarEstado(){
    if(this.estadoLabelProveedores == "Ver") { 
      this.estadoLabelProveedores = "Ocultar"
    } else {
      this.estadoLabelProveedores = "Ver"
    }
  }

  onSeleccionProveedorChange(proveedor: Proveedor){
  	console.log(proveedor);

    this.facturaCompra.proveedor = proveedor;

/*    if(proveedor.listaPrecioNombre != null) {
	    this.ldpService.getListaDePreciosByName(proveedor.listaPrecioNombre)
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
    }*/

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

    console.log(total)

    return total;
  }

  borrar(numeroFactura: number){
  }

  guardarFactura(){

  }

  agregarCliente(){

  }

}
