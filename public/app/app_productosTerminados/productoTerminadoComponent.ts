import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ProductoTerminadoServices } from './productoTerminadoServices';

@Component({
  selector: 'tabla-productos-terminados',
  templateUrl: "app/app_productosTerminados/productoTerminadoComponent.html"
})
export class ProductoTerminadoComponent implements OnInit{
  private productosTerminados: Response;

  private _id : string;
  private listaPrecioID: string;
  private tasaImpositiva: string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsado: number;
  private porcentajeMerma: number;
  private tipo: string;
  private precioVenta: number;

  private mostrarModalModificar: boolean = true;
  
  constructor(private ptService: ProductoTerminadoServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO PRODUCTOS TERM");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getProductosTerminados()
              .subscribe(
                (productosTerminadosData) => {
                  this.productosTerminados = productosTerminadosData;
                  console.log(this.productosTerminados);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.ptService.borrarProductoTerminado(id)
                      .subscribe(
                        () => { 
                      alert("¡Se borro existosamente! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                      },
                        err => console.error("EL ERROR FUE: ", err)
                      );
    } else {
        console.log("You pressed CANCEL!");
    }
  }

  modificar(productoTerminado: any){
    this._id =                productoTerminado._id;
    this.listaPrecioID =      productoTerminado.listaPrecioID;

    switch (productoTerminado.tasaImpositivaID) {
      case "ti1":
        this.tasaImpositiva = "IVA-0%";
        break;
      case "ti2":
        this.tasaImpositiva = "IVA-10.5%";
        break;  
      case "ti3":
        this.tasaImpositiva = "IVA-21%";
        break;
      case "ti4":
        this.tasaImpositiva = "IVA-27%";
        break;  
      default:
        this.tasaImpositiva = "IVA-0%";
        break;
    }

    this.nombre =            productoTerminado.nombre;
    this.cantidad =          productoTerminado.cantidad;
    this.unidad =            productoTerminado.unidad;
    this.stockMin =          productoTerminado.stockMin;
    this.stockMax =          productoTerminado.stockMax;
    this.embolsado =         productoTerminado.embolsadoCantDefault;
    this.porcentajeMerma =   productoTerminado.porcentajeMerma;
    this.tipo =              productoTerminado.tipo;
    this.precioVenta=        productoTerminado.precioVenta;
  }

  guardarModificaciones(){
    if(this.nombre && this.stockMin && this.stockMax) { 
      this.mostrarModalModificar = false;
      let tasaImpositivaID: string;
      switch (this.tasaImpositiva.split("-")[1].split("%")[0]) {
        case "0":
          tasaImpositivaID = "ti1";
          break;
        case "10.5":
          tasaImpositivaID = "ti2";
          break;  
        case "21":
          tasaImpositivaID = "ti3";
          break;
        case "27":
          tasaImpositivaID = "ti4";
          break;  
        default:
          tasaImpositivaID = "ti1";
          break;
      }
      let productoTerminado = {
          _id:                  this._id,
          listaPrecioID:        this.listaPrecioID,
          tasaImpositivaID:     tasaImpositivaID,
          nombre:               this.nombre,
          cantidad:             this.cantidad,
          unidad:               this.unidad,
          stockMin:             this.stockMin,
          stockMax:             this.stockMax,
          embolsadoCantDefault: this.embolsado,
          porcentajeMerma:      this.porcentajeMerma,
          tipo:                 this.tipo,
          precioVenta:          this.precioVenta
      }
      
      console.log(productoTerminado);

      this.ptService.modificar(productoTerminado)
                    .subscribe(data => {
                        console.log(data);
                        alert("¡Producto terminado modificado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al modificar Producto terminado, revise los campos");
                    });;
    } else {
        alert("¡ERROR! Campos obligatorios: Nombre - Stock Min - Stock Max");
    }
  }
}