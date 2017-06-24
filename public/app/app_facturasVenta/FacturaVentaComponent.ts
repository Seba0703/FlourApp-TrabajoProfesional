import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { FacturaVenta } from './FacturaVenta';
import { Cliente } from '../app_clientes/cliente';
import { ElementoListaDePrecios } from '../app_listaDePrecios/elementoListaDePrecios'

import { Producto } from './Producto';

import { FacturaVentaServices } from './FacturaVentaServices';

import { ClienteServices } from '../app_clientes/clienteServices';
import { ListaDePrecioServices } from '../app_listaDePrecios/ListaDePrecioServices';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';
import {Vencimiento} from "./Vencimiento";
import {RetencionServices} from "../app_retenciones/retencionServices";
import {Retencion} from "../app_retenciones/retencion";
import {RetencionFactura} from "./RetencionFactura";
import {RetencionFacturaVista} from "./RetencionFacturaVista";


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
  private nombresListasDePreciosDisponibles: string[];
  private productosDisponibles: Array<any>;

  private retenciones: Retencion[];
  public filteredList: Retencion[] = [];
  public query: string = '';
  //retencion seleccionada del autocomplete
  public retencion: Retencion;

  constructor(
    private fvService: FacturaVentaServices,
  	private cService: ClienteServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices,
    private retencionSrv: RetencionServices){
    
    this.facturaVenta = new FacturaVenta();
    this.productosDisponibles = new Array<any>();
    this.facturasVentaDisponibles = [];
  }

  ngOnInit() {
      console.log("ON INIT");

      this.estadoLabelClientes = "Ver";
      this.cargarClientesDisponibles();
      this.cargarListasDePreciosDisponibles();
      this.cargarProductosDisponibles();
      this.cargarRetenciones();
  }


  cargarClientesDisponibles(){
    this.clientesDisponibles = []
  	this.cService.getBasicDataClientes()
  				 .subscribe( 
  				 	clientes => {
               this.clientesDisponibles = clientes;
               console.log("clientesDisponibles CARGADOS=");
               console.log(this.clientesDisponibles);
               this.cargarFacturasVentaDisponibles();
             },
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  cargarFacturasVentaDisponibles(){
    this.facturasVentaDisponibles = []
    console.log("CARGANDO FACTURAS DISPONIBLES= ");
    this.fvService.getFacturas()
           .subscribe( 
             fvDisponibles => {
               for (let fv of fvDisponibles){
                for (var i = 0; i < this.clientesDisponibles.length; ++i) {
                  if(fv.empresaID == this.clientesDisponibles[i]._id) {
                    let cliente = this.clientesDisponibles[i]
                    
                    this.fvService
                    .getProductosDeLaFacturaID(fv._id)
                    .subscribe(productos => {
                      console.log("PRODUCTOS GUARDADOS");
                      console.log(productos);

                      this.fvService.getVencimientosFacturaID(fv._id).then( vencimientos => {

                        this.facturasVentaDisponibles
                            .push(
                                new FacturaVenta(
                                    fv._id,
                                    fv.fechaEmision,
                                    cliente,
                                    fv.condicionPago,
                                    fv.listaPrecioNombre,
                                    productos,
                                    vencimientos,
                                    fv.retencionesFactura_ids)
                            )

                        console.log(this.facturasVentaDisponibles)
                      });

                    })
                  }
                }
               }
               
             },
             err => console.error("EL ERROR FUE: ", err));
  }

  cargarListasDePreciosDisponibles(){
    this.ldpService
    .getListaDePrecios()
    .subscribe(
      listasDePrecios => {
        this.nombresListasDePreciosDisponibles = listasDePrecios.map(function(listaDePrecios) {return listaDePrecios.nombre})
        this.nombresListasDePreciosDisponibles = Array.from(new Set(this.nombresListasDePreciosDisponibles));//filtro repetidos

        console.log("NOMBRES LISTAS DE PRECIOS CARGADOS= ");
        console.log(this.nombresListasDePreciosDisponibles);
      },
      err => console.error("EL ERROR FUE: ", err)
    )
  }

  cargarProductosDisponibles(){
    this.productosDisponibles = new Array<any>();
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
    
    this.cargarProductosDisponibles()
  }


  seleccionarFacturaParaModificar(factura: FacturaVenta){
    factura.recalcularRetencionAllSinVista(this.productosDisponibles);
    this.facturaVenta = factura;
    this.facturaVenta.fecha = new Date(factura.fecha);//la asingnacion anterior no funciona para fecha
    console.log("PROCESANDO FACTURA=");
    console.log(this.facturaVenta);

  }

  generarRemito(factura: FacturaVenta){

    console.log("PROCESANDO FACTURA=");
    console.log(factura);

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
    this.facturaVenta.condicionDePago = cliente.condicionPago;
    this.facturaVenta.nombreListaDePrecios = cliente.listaPrecioNombre;

    if(cliente.listaPrecioNombre != null) {
      this.actualizarPreciosEnBaseAlistaDePreciosConNombre(cliente.listaPrecioNombre)
    }

    this.facturaVenta.recalcularRetencionAllUpdateVista(); //cambian los precios de los productos y los importes finales
  }

  onListaDePreciosChange(){
    console.log("LDP CHANGE!!!");
    this.actualizarPreciosEnBaseAlistaDePreciosConNombre(this.facturaVenta.nombreListaDePrecios);
      this.facturaVenta.recalcularRetencionAllUpdateVista(); //cambian los precios de los productos y los importes finales
  }

  actualizarPreciosEnBaseAlistaDePreciosConNombre(nombreListaDePrecios: string){
    this.ldpService.getListaDePreciosByName(nombreListaDePrecios)
             .subscribe(listaDePrecios => {
                 console.log(listaDePrecios)
                 for(let elemento of listaDePrecios){
                  for (var i = 0; i < this.productosDisponibles.length; ++i) {
                    if (this.productosDisponibles[i]._id == elemento.mp_ID
                      || this.productosDisponibles[i]._id == elemento.sp_ID 
                      || this.productosDisponibles[i]._id == elemento.pt_ID) {

                        this.productosDisponibles[i].precioVenta = elemento.precio;
                        
                        let index: number = 0;
                        for(let productoSeleccionado of this.facturaVenta.productos){
                          if(this.productosDisponibles[i]._id == productoSeleccionado.mp_sp_pt_ID) {
                            break;
                          } else {
                            index++;
                          }
                        }
                        console.log("INDEX= " + index);
                        if(this.facturaVenta.productos[index] != undefined) {
                          this.facturaVenta.productos[index].precioVenta = elemento.precio;
                        }
                        
                    }
                  }
                 }

                 this.facturaVenta.recalcularRetencionAllUpdateVista(); //cambian los precios de los productos y los importes finales
                 console.log("PRODUCTOS DISPONIBLES ACTUALIZADOS POR LPD= ");
                console.log(this.productosDisponibles);
             })

  }

  elProductoFueSeleccionado(producto: any){
    for (let prodSeleccionado of this.facturaVenta.productos){
      if(producto._id == prodSeleccionado.mp_sp_pt_ID) {
        return true
      }
    }
    return false
  }

  onSeleccionProductoChange(producto: any, valorCheck: boolean){
  	if(valorCheck == true) {
      if(this.facturaVenta.nombreListaDePrecios != null) {
        this.ldpService
        .getListaDePrecios()
        .subscribe(
          listasDePrecios => {
            console.log(listasDePrecios.length)
            for(let listaDePrecios of listasDePrecios){
              if(this.facturaVenta.nombreListaDePrecios == listaDePrecios.nombre){
                if(listaDePrecios.mp_ID != null && listaDePrecios.mp_ID._id == producto._id) {
                  producto.precioVenta = listaDePrecios.precio
                  console.log("ENCONTRADO")
                  break
                } else if(listaDePrecios.sp_ID != null && listaDePrecios.sp_ID._id == producto._id) {
                  producto.precioVenta = listaDePrecios.precio
                  console.log("ENCONTRADO")
                  console.log(listaDePrecios.sp_ID.precioVenta)
                  break
                } else if(listaDePrecios.pt_ID != null && listaDePrecios.pt_ID._id == producto._id) {
                  producto.precioVenta = listaDePrecios.precio
                  console.log("ENCONTRADO")
                  break
                }
              }
            }
            console.log(producto.precioVenta);
            let productoAdded: Producto = new Producto(null, "unTipo", producto._id, producto.nombre, 1, producto.precioVenta, this.getIVA(producto), producto.retenciones_ids);
            this.facturaVenta.productos.push(productoAdded);
            this.facturaVenta.setImportesEnVencimientos();
            this.facturaVenta.updateVistaAddRetencionFor(producto._id, productoAdded.retenciones_ids, productoAdded.cantidad * productoAdded.precioVenta * (1 + (productoAdded.iva/100)) , false);
            this.facturaVenta.recalcularRetencionCliente(); //se agrego un item, cambia el importe total -> cambia la retencion del cliente
          },
          err => console.error("EL ERROR FUE: ", err)
        )
      }
  	} else {
  		let index = 0;
  		for(let productoSeleccionado of this.facturaVenta.productos){
  			if(producto._id == productoSeleccionado.mp_sp_pt_ID) {
  				this.facturaVenta.productos.splice(index, 1);
                this.facturaVenta.removeRetencion(producto._id, producto.retenciones_ids);
                this.facturaVenta.recalcularRetencionCliente();	//cambia importe -> cambia retenciones cliente
  			} else {
  				index++;
  			}
  		}
  	}
  	
  	console.log(this.facturaVenta.productos)
  }

  getIndex(producto: any): number{
    let index = 0;
    for(let productoSeleccionado of this.facturaVenta.productos){
      if(producto._id == productoSeleccionado.mp_sp_pt_ID) {
        return index
      }
      index++
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

  getImporte(): number {
    return this.facturaVenta.getImporte()
  }

  cancelarCambios(){
    this.cargarFacturasVentaDisponibles()
  }

  guardarFactura(){
    console.log(this.facturaVenta)

    let bodyFacturaVenta = {
      tipo:               "fact_venta",
      tipoFactura:        "A",
      fechaEmision:       this.facturaVenta.fecha,
      empresaID:          this.facturaVenta.cliente._id,
      condicionPago:      this.facturaVenta.condicionDePago,
      listaPrecioNombre:  this.facturaVenta.nombreListaDePrecios,
      retencionesFactura_ids: this.facturaVenta.retencionesFacturaVista,
      retencionesDelete_ids: this.facturaVenta.retencionesDelete_ids
    }

    if (this.facturaVenta.isControlTotal_OK()) {

      if (this.facturaVenta._id == undefined) { // Es un alta nueva

        console.log(bodyFacturaVenta)

        this.fvService
            .agregarFactura(bodyFacturaVenta)
            .subscribe(
                fvAgregada => {
                  console.log(fvAgregada)

                  let bodyDocumentoMercantilItem = {}
                  for (let producto of this.facturaVenta.productos) {
                    bodyDocumentoMercantilItem = {
                      tipo: "tipo",
                      productoID: producto.mp_sp_pt_ID,
                      nombre: producto.nombre,
                      cantidad: producto.cantidad,
                      precio: producto.precioVenta,
                      iva: producto.iva,
                      documentoMercantilID: fvAgregada._id
                    }

                    console.log("VINCULANDO bodyDocumentoMercantilItem=")
                    console.log(bodyDocumentoMercantilItem)

                    this.fvService.vincularProducto(bodyDocumentoMercantilItem).subscribe()

                  }

                  for (var i = 0; i < this.facturaVenta.vencimientos.length; i++) {
                    console.log("VINCULANDO Vencimientos");
                    var vencimiento: Vencimiento = this.facturaVenta.vencimientos[i];
                    vencimiento.factura_id = fvAgregada._id;
                    console.log(vencimiento);

                    this.fvService.vincularVencimientos(vencimiento).then();
                  }

                  alert("\t\t\t\t¡Factura guardada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                  window.location.reload();
                },
                err => console.error("EL ERROR FUE: ", err));

      } else { // Esta modificando una factura existente

        bodyFacturaVenta["_id"] = this.facturaVenta._id

        console.log(bodyFacturaVenta)

        this.fvService
            .modificarFactura(bodyFacturaVenta)
            .subscribe(res => {
              let bodyDocumentoMercantilItem = {}
              for (let producto of this.facturaVenta.productos) {
                bodyDocumentoMercantilItem = {
                  _id: producto._id,
                  tipo: "tipo",
                  productoID: producto.mp_sp_pt_ID,
                  nombre: producto.nombre,
                  cantidad: producto.cantidad,
                  precio: producto.precioVenta,
                  iva: producto.iva,
                  documentoMercantilID: this.facturaVenta._id
                }

                console.log("MODIFICANDO bodyDocumentoMercantilItem=")
                console.log(bodyDocumentoMercantilItem)

                this.fvService.modificarProducto(bodyDocumentoMercantilItem).subscribe()
              }

              for (var i = 0; i < this.facturaVenta.vencimientos.length; i++) {
                console.log("VINCULANDO Vencimientos");
                var vencimiento: Vencimiento = this.facturaVenta.vencimientos[i];
                vencimiento.factura_id = this.facturaVenta._id;
                console.log(vencimiento);
                if (vencimiento._id) {
                  this.fvService.vincularVencimientosUpdate(vencimiento).then();
                } else {
                  this.fvService.vincularVencimientos(vencimiento).then();
                }
              }

              alert("\t\t\t\t¡Factura modificada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
              window.location.reload();

            })
      }
    }
  }

  borrar(factura: FacturaVenta){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        this.fvService
        .borrarFactura(factura)
        .subscribe(() => { 
          alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
          window.location.reload();
          },
          err => console.error("EL ERROR FUE: ", err)
        )
    }
  }

    cargarRetenciones() {
        this.retencionSrv.getRetenciones().then(retenciones => {
            this.retenciones = retenciones;
            this.filteredList = retenciones;

        })
    }

    select(retencion: Retencion){
        this.query = retencion.nombre;
        this.retencion = retencion;
        this.filteredList = this.retenciones;
    }

    filter() {
        if (this.query !== ""){
            this.filteredList = this.retenciones.filter(function(retencion: Retencion){
                return retencion.nombre.toLowerCase().indexOf(this.query.toLowerCase()) > -1
                    || retencion.codigo.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = this.retenciones;
        }
    }

    agregarRetencion() {
        if (this.retencion && !this.hasRetencion(this.retencion)) {
            this.facturaVenta.retencionesFacturaVista.push(new RetencionFacturaVista(null, 0, this.retencion));
            this.retencion = null;
        }
    }

    hasRetencion(retencion: Retencion): boolean {
        var i = 0;
        var hasRetencion = false;
        while (i <  this.facturaVenta.retencionesFacturaVista.length && !hasRetencion) {
            if (this.facturaVenta.retencionesFacturaVista[i].retencion_id._id == retencion._id) {
                hasRetencion = true;
            }
            i++;
        }

        return hasRetencion;
    }

}
