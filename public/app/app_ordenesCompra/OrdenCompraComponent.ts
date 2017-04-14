import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { OrdenCompra } from './OrdenCompra';
import { Proveedor } from '../app_proveedores/proveedor';
import { ElementoListaDePrecios } from '../app_listaDePrecios/elementoListaDePrecios'

import { Producto } from './Producto';

import { OrdenCompraServices } from './OrdenCompraServices';

import { ProveedorServices } from '../app_proveedores/proveedorServices';
import { ListaDePrecioServices } from '../app_listaDePrecios/ListaDePrecioServices';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';


@Component({
  selector: 'orden-compra-component',
  templateUrl: "app/app_ordenesCompra/OrdenCompraComponent.html"
})
export class OrdenCompraComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  public clickedDatepicker: boolean = false;
  public clickedDatepickerVTO: boolean = false;

  private ordenesCompraDisponibles: OrdenCompra[];
  private ordenCompra: OrdenCompra;

  private estadoLabelProveedores: string;

  private proveedoresDisponibles: Proveedor[];
  private nombresListasDePreciosDisponibles: string[];
  private productosDisponibles: Array<any>;

  constructor(
    private ocService: OrdenCompraServices,
  	private pService: ProveedorServices,
  	private ldpService: ListaDePrecioServices,
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    
    this.ordenCompra = new OrdenCompra();
    this.productosDisponibles = new Array<any>();
    this.ordenesCompraDisponibles = [];
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
               this.cargarOrdenesCompraDisponibles();
             },
  				 	err => console.error("EL ERROR FUE: ", err));
  }

  cargarOrdenesCompraDisponibles(){
    this.ordenesCompraDisponibles = []
    console.log("CARGANDO Ordenes compra DISPONIBLES= ");
    this.ocService.getOrdenesCompra()
           .subscribe( 
             ocDisponibles => {
               for (let oc of ocDisponibles){
                for (var i = 0; i < this.proveedoresDisponibles.length; ++i) {
                  if(oc.empresaID == this.proveedoresDisponibles[i]._id) {
                    let proveedor = this.proveedoresDisponibles[i]
                    
                    this.ocService
                    .getProductosDelDocumentoMercantilID(oc._id)
                    .subscribe(productos => {
                      console.log("PRODUCTOS GUARDADOS")
                      console.log(productos)

                      this.ordenesCompraDisponibles
                      .push(
                        new OrdenCompra(
                          oc._id, 
                          oc.fechaEmision,
                          oc.fechaVencimiento,
                          proveedor, 
                          oc.condicionPago, 
                          productos)
                      )

                      console.log(this.ordenesCompraDisponibles)
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

  crearOrdenCompra(){
    this.ordenCompra = new OrdenCompra()
    
    this.cargarProductosDisponibles()
  }


  seleccionarOrdenCompraParaModificar(ordenCompra: OrdenCompra){
    this.ordenCompra = ordenCompra;
    this.ordenCompra.fecha = new Date(ordenCompra.fecha)//la asingnacion anterior no funciona para fecha
    this.ordenCompra.fechaVencimiento = new Date(ordenCompra.fechaVencimiento)//la asingnacion anterior no funciona para fecha
    console.log("PROCESANDO ORD Compra=")
    console.log(this.ordenCompra)

  }

  public toggleDP():boolean {
    this.clickedDatepicker = !this.clickedDatepicker;
    return !this.clickedDatepicker;
  }

  public toggleDP_VTO():boolean {
    this.clickedDatepickerVTO = !this.clickedDatepickerVTO;
    return !this.clickedDatepickerVTO;
  }

  cambiarEstado(){
    if(this.estadoLabelProveedores == "Ver") { 
      this.estadoLabelProveedores = "Ocultar"
    } else {
      this.estadoLabelProveedores = "Ver"
    }
  }

  fueSeleccionado(proveedor: Proveedor){
    return this.ordenCompra.proveedor == proveedor
  }

  onSeleccionProveedorChange(proveedor: Proveedor){
  	console.log(proveedor);

    this.ordenCompra.proveedor = proveedor;
    this.ordenCompra.condicionDePago = proveedor.condicionPago;
/*    this.ordenCompra.nombreListaDePrecios = proveedor.listaPrecioNombre;

    if(proveedor.listaPrecioNombre != null) {
      this.actualizarPreciosEnBaseAlistaDePreciosConNombre(proveedor.listaPrecioNombre)
    }*/
  }

  onListaDePreciosChange(){
/*    console.log("LDP CHANGE!!!");
    this.actualizarPreciosEnBaseAlistaDePreciosConNombre(this.ordenCompra.nombreListaDePrecios)*/
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
                        for(let productoSeleccionado of this.ordenCompra.productos){
                          if(this.productosDisponibles[i]._id == productoSeleccionado.mp_sp_pt_ID) {
                            break;
                          } else {
                            index++;
                          }
                        }
                        console.log("INDEX= " + index);
                        if(this.ordenCompra.productos[index] != undefined) {
                          this.ordenCompra.productos[index].precioVenta = elemento.precio;
                        }
                        
                    }
                  }
                 }

                 console.log("PRODUCTOS DISPONIBLES ACTUALIZADOS POR LPD= ");
                console.log(this.productosDisponibles);
             })*/

  }

  elProductoFueSeleccionado(producto: any){
    for (let prodSeleccionado of this.ordenCompra.productos){
      if(producto._id == prodSeleccionado.mp_sp_pt_ID) {
        return true
      }
    }
    return false
  }

  onSeleccionProductoChange(producto: any, valorCheck: boolean){
  	if(valorCheck == true) {
/*      if(this.ordenCompra.nombreListaDePrecios != null) {
        this.ldpService
        .getListaDePrecios()
        .subscribe(
          listasDePrecios => {
            console.log(listasDePrecios.length)
            for(let listaDePrecios of listasDePrecios){
              if(this.ordenCompra.nombreListaDePrecios == listaDePrecios.nombre){
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
            this.ordenCompra.productos.push(new Producto(null, producto.tipo, producto._id, producto.nombre, 1, producto.precioVenta, this.getIVA(producto)));
          },
          err => console.error("EL ERROR FUE: ", err)
        )
      }*/
      this.ordenCompra.productos.push(new Producto(null, producto.tipo, producto._id, producto.nombre, 1, producto.precioVenta, this.getIVA(producto)));
  	} else {
  		let index = 0;
  		for(let productoSeleccionado of this.ordenCompra.productos){
  			if(producto._id == productoSeleccionado.mp_sp_pt_ID) {
  				this.ordenCompra.productos.splice(index, 1);
  			} else {
  				index++;
  			}
  		}
  	}
  	
  	console.log(this.ordenCompra.productos)
  }

  getIndex(producto: any): number{
    let index = 0;
    for(let productoSeleccionado of this.ordenCompra.productos){
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
    return this.ordenCompra.getImporte()
  }

  cancelarCambios(){
    this.cargarOrdenesCompraDisponibles()
  }

  guardarOrdenCompra(){
    console.log(this.ordenCompra)

    let bodyOrdenCompra = {
      tipo:               "ord_compra",
      fechaEmision:       this.ordenCompra.fecha,
      fechaVencimiento:   this.ordenCompra.fechaVencimiento,
      empresaID:          this.ordenCompra.proveedor._id,
      condicionPago:      this.ordenCompra.condicionDePago,
    }

    if(this.ordenCompra._id == undefined) { // Es un alta nueva

      console.log(bodyOrdenCompra)

      this.ocService
        .agregarOrdenCompra(bodyOrdenCompra)
        .subscribe( 
          ocAgregada => {
            console.log(ocAgregada)

            let bodyDocumentoMercantilItem = {}
            for(let producto of this.ordenCompra.productos){
              bodyDocumentoMercantilItem = {
                tipo:                   producto.tipo,
                productoID:             producto.mp_sp_pt_ID,
                nombre:                 producto.nombre,
                cantidad:               producto.cantidad,
                precio:                 producto.precioVenta,
                iva:                    producto.iva,
                documentoMercantilID:   ocAgregada._id
              }

              console.log("VINCULANDO bodyDocumentoMercantilItem=")
              console.log(bodyDocumentoMercantilItem)

              this.ocService.vincularProducto(bodyDocumentoMercantilItem).subscribe()

            }

            alert("\t\t\t\t¡Factura guardada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
            window.location.reload();
          },
          err => console.error("EL ERROR FUE: ", err));

    } else { // Esta modificando una ordenCompra existente

      bodyOrdenCompra["_id"] = this.ordenCompra._id

      console.log(bodyOrdenCompra)

      this.ocService
      .modificarOrdenCompra(bodyOrdenCompra)
      .subscribe(res => {
        let bodyDocumentoMercantilItem = {}
        for(let producto of this.ordenCompra.productos){
          bodyDocumentoMercantilItem = {
            _id:                     producto._id,
            tipo:                    producto.tipo,
            productoID:              producto.mp_sp_pt_ID,
            nombre:                  producto.nombre,
            cantidad:                producto.cantidad,
            precio:                  producto.precioVenta,
            iva:                     producto.iva,
            documentoMercantilID:   this.ordenCompra._id
          }

          console.log("MODIFICANDO bodyDocumentoMercantilItem=")
          console.log(bodyDocumentoMercantilItem)

          this.ocService.modificarProducto(bodyDocumentoMercantilItem).subscribe()
        }

        alert("\t\t\t\t¡Factura modificada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
        window.location.reload();

      })

    }
  }

  borrar(ordenCompra: OrdenCompra){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        this.ocService
        .borrarOrdenCompra(ordenCompra)
        .subscribe(() => { 
          alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
          window.location.reload();
          },
          err => console.error("EL ERROR FUE: ", err)
        )
    }
  }

}
