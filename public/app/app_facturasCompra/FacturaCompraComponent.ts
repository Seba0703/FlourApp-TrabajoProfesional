import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { FacturaCompra } from './FacturaCompra';
import { Proveedor } from '../app_proveedores/proveedor';
import { ElementoListaDePrecios } from '../app_listaDePrecios/elementoListaDePrecios'

import { Producto } from './Producto';

import { FacturaCompraServices } from './FacturaCompraServices';

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

  public clickedDatepicker: boolean = false;

  private facturasCompraDisponibles: FacturaCompra[];
  private facturaCompra: FacturaCompra;

  private estadoLabelProveedores: string;

  private proveedoresDisponibles: Proveedor[];
  private nombresListasDePreciosDisponibles: string[];
  private productosDisponibles: Array<any>;

  constructor(
    private fcService: FacturaCompraServices,
  	private pService: ProveedorServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    
    this.facturaCompra = new FacturaCompra();
    this.productosDisponibles = new Array<any>();
    this.facturasCompraDisponibles = [];
  }

  ngOnInit() {
    console.log("ON INIT");

    this.estadoLabelProveedores = "Ver";
    this.cargarProveedoresDisponibles();
    //this.cargarListasDePreciosDisponibles();
    this.cargarProductosDisponibles();
  }

  cargarProveedoresDisponibles(){
    this.proveedoresDisponibles = []
  	this.pService.getBasicDataProveedores()
  				 .subscribe( 
  				 	proveedores => {
               this.proveedoresDisponibles = proveedores;
               console.log("proveedoresDisponibles CARGADOS=");
               console.log(this.proveedoresDisponibles);
               this.cargarFacturasCompraDisponibles();
             },
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  cargarFacturasCompraDisponibles(){
    this.facturasCompraDisponibles = []
    console.log("CARGANDO FACTURAS DISPONIBLES= ");
    this.fcService.getFacturas()
           .subscribe( 
             fcDisponibles => {
               for (let fc of fcDisponibles){
                for (var i = 0; i < this.proveedoresDisponibles.length; ++i) {
                  if(fc.empresaID == this.proveedoresDisponibles[i]._id) {
                    let proveedor = this.proveedoresDisponibles[i]
                    
                    this.fcService
                    .getProductosDelDocumentoMercantilID(fc._id)
                    .subscribe(productos => {
                      console.log("PRODUCTOS GUARDADOS")
                      console.log(productos)

                      this.facturasCompraDisponibles
                      .push(
                        new FacturaCompra(
                          fc._id, 
                          fc.fechaEmision, 
                          proveedor, 
                          fc.condicionPago, 
                          fc.listaPrecioNombre, 
                          productos)
                      )

                      console.log(this.facturasCompraDisponibles)
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
    this.facturaCompra = new FacturaCompra()
    
    this.cargarProductosDisponibles()
  }


  seleccionarFacturaParaModificar(factura: FacturaCompra){
    this.facturaCompra = factura;
    this.facturaCompra.fecha = new Date(factura.fecha)//la asingnacion anterior no funciona para fecha
    console.log("PROCESANDO FACTURA=")
    console.log(this.facturaCompra)

  }

  public toggleDP():boolean {
    this.clickedDatepicker = !this.clickedDatepicker;
    return !this.clickedDatepicker;
  }

  cambiarEstado(){
    if(this.estadoLabelProveedores == "Ver") { 
      this.estadoLabelProveedores = "Ocultar"
    } else {
      this.estadoLabelProveedores = "Ver"
    }
  }

  fueSeleccionado(proveedor: Proveedor){
    return this.facturaCompra.proveedor == proveedor
  }

  onSeleccionProveedorChange(proveedor: Proveedor){
  	console.log(proveedor);

    this.facturaCompra.proveedor = proveedor;
    this.facturaCompra.condicionDePago = proveedor.condicionPago;
/*    this.facturaCompra.nombreListaDePrecios = proveedor.listaPrecioNombre;

    if(proveedor.listaPrecioNombre != null) {
      this.actualizarPreciosEnBaseAlistaDePreciosConNombre(proveedor.listaPrecioNombre)
    }*/
  }

  onListaDePreciosChange(){
/*    console.log("LDP CHANGE!!!");
    this.actualizarPreciosEnBaseAlistaDePreciosConNombre(this.facturaCompra.nombreListaDePrecios)*/
  }

  actualizarPreciosEnBaseAlistaDePreciosConNombre(nombreListaDePrecios: string){
/*    this.ldpService.getListaDePreciosByName(nombreListaDePrecios)
             .subscribe(listaDePrecios => {
                 console.log(listaDePrecios)
                 for(let elemento of listaDePrecios){
                  for (var i = 0; i < this.productosDisponibles.length; ++i) {
                    if (this.productosDisponibles[i]._id == elemento.mp_ID
                      || this.productosDisponibles[i]._id == elemento.sp_ID 
                      || this.productosDisponibles[i]._id == elemento.pt_ID) {

                        this.productosDisponibles[i].precioVenta = elemento.precio;
                        
                        let index: number = 0;
                        for(let productoSeleccionado of this.facturaCompra.productos){
                          if(this.productosDisponibles[i]._id == productoSeleccionado.mp_sp_pt_ID) {
                            break;
                          } else {
                            index++;
                          }
                        }
                        console.log("INDEX= " + index);
                        if(this.facturaCompra.productos[index] != undefined) {
                          this.facturaCompra.productos[index].precioVenta = elemento.precio;
                        }
                        
                    }
                  }
                 }

                 console.log("PRODUCTOS DISPONIBLES ACTUALIZADOS POR LPD= ");
                console.log(this.productosDisponibles);
             })*/

  }

  elProductoFueSeleccionado(producto: any){
    for (let prodSeleccionado of this.facturaCompra.productos){
      if(producto._id == prodSeleccionado.mp_sp_pt_ID) {
        return true
      }
    }
    return false
  }

  onSeleccionProductoChange(producto: any, valorCheck: boolean){
  	if(valorCheck == true) {
/*      if(this.facturaCompra.nombreListaDePrecios != null) {
        this.ldpService
        .getListaDePrecios()
        .subscribe(
          listasDePrecios => {
            console.log(listasDePrecios.length)
            for(let listaDePrecios of listasDePrecios){
              if(this.facturaCompra.nombreListaDePrecios == listaDePrecios.nombre){
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
            console.log(producto.precioVenta)
            this.facturaCompra.productos.push(new Producto(null, producto.tipo, producto._id, producto.nombre, 1, producto.precioVenta, this.getIVA(producto)));
          },
          err => console.error("EL ERROR FUE: ", err)
        )
      }*/
      this.facturaCompra.productos.push(new Producto(null, producto.tipo, producto._id, producto.nombre, 1, producto.precioVenta, this.getIVA(producto)));
  	} else {
  		let index = 0;
  		for(let productoSeleccionado of this.facturaCompra.productos){
  			if(producto._id == productoSeleccionado.mp_sp_pt_ID) {
  				this.facturaCompra.productos.splice(index, 1);
  			} else {
  				index++;
  			}
  		}
  	}
  	
  	console.log(this.facturaCompra.productos)
  }

  getIndex(producto: any): number{
    let index = 0;
    for(let productoSeleccionado of this.facturaCompra.productos){
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
    return this.facturaCompra.getImporte()
  }

  cancelarCambios(){
    this.cargarFacturasCompraDisponibles()
  }

  guardarFactura(){
    console.log(this.facturaCompra)

    let bodyFacturaCompra = {
      tipo:               "fact_compra",
      tipoFactura:        "A",
      fechaEmision:       this.facturaCompra.fecha,
      empresaID:          this.facturaCompra.proveedor._id,
      condicionPago:      this.facturaCompra.condicionDePago,
      listaPrecioNombre:  this.facturaCompra.nombreListaDePrecios
    }

    if(this.facturaCompra._id == undefined) { // Es un alta nueva

      console.log(bodyFacturaCompra)

      this.fcService
        .agregarFactura(bodyFacturaCompra)
        .subscribe( 
          fcAgregada => {
            console.log(fcAgregada)

            let bodyDocumentoMercantilItem = {}
            for(let producto of this.facturaCompra.productos){
              bodyDocumentoMercantilItem = {
                tipo:                   producto.tipo,
                productoID:             producto.mp_sp_pt_ID,
                nombre:                 producto.nombre,
                cantidad:               producto.cantidad,
                precio:                 producto.precioVenta,
                iva:                    producto.iva,
                documentoMercantilID:   fcAgregada._id
              }

              console.log("VINCULANDO bodyDocumentoMercantilItem=")
              console.log(bodyDocumentoMercantilItem)

              this.fcService.vincularProducto(bodyDocumentoMercantilItem).subscribe()

            }

            alert("\t\t\t\t¡Factura guardada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
            window.location.reload();
          },
          err => console.error("EL ERROR FUE: ", err));

    } else { // Esta modificando una factura existente

      bodyFacturaCompra["_id"] = this.facturaCompra._id

      console.log(bodyFacturaCompra)

      this.fcService
      .modificarFactura(bodyFacturaCompra)
      .subscribe(res => {
        let bodyDocumentoMercantilItem = {}
        for(let producto of this.facturaCompra.productos){
          bodyDocumentoMercantilItem = {
            _id:                     producto._id,
            tipo:                    producto.tipo,
            productoID:              producto.mp_sp_pt_ID,
            nombre:                  producto.nombre,
            cantidad:                producto.cantidad,
            precio:                  producto.precioVenta,
            iva:                     producto.iva,
            documentoMercantilID:   this.facturaCompra._id
          }

          console.log("MODIFICANDO bodyDocumentoMercantilItem=")
          console.log(bodyDocumentoMercantilItem)

          this.fcService.modificarProducto(bodyDocumentoMercantilItem).subscribe()
        }

        alert("\t\t\t\t¡Factura modificada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
        window.location.reload();

      })

    }
  }

  borrar(factura: FacturaCompra){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        this.fcService
        .borrarFactura(factura)
        .subscribe(() => { 
          alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
          window.location.reload();
          },
          err => console.error("EL ERROR FUE: ", err)
        )
    }
  }

}
