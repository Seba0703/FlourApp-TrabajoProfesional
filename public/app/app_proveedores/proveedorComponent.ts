import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'tabla-proveedores',
    templateUrl: "app/app_proveedores/proveedorComponent.html"
})

export class ProveedorComponent {
  private proveedores: Response;

  private _id : string;
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscalID: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPagoID: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private pService: ProveedorServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO CLIENTES");
    // en el momento del subscribe es cuando se dispara la llamada
    this.pService.getProveedores()
              .subscribe(
                (proveedoresData) => {
                  this.proveedores = proveedoresData;
                  console.log(this.proveedores);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.pService.borrarProveedor(id)
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

  modificar(proveedor: any){
    this._id =                proveedor._id;
    this.nombreEmpresa =      proveedor.nombreEmpresa;
    this.cuit =               proveedor.cuit;
    this.categoriaFiscalID =  proveedor.categoriaFiscalID;
    this.listaPrecioID =      proveedor.listaPrecioID;
    this.direccion =          proveedor.direccion;
    this.condicionPagoID =    proveedor.condicionPagoID;
  }

  guardarModificaciones(){
    if(this.nombreEmpresa && this.cuit && this.categoriaFiscalID && this.listaPrecioID && this.direccion && this.condicionPagoID){
      this.mostrarModalModificar = false;
      let proveedor = {
          _id:                this._id,
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscalID:  this.categoriaFiscalID,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPagoID:    this.condicionPagoID
      }
      
      console.log(proveedor);

      this.pService.modificar(proveedor)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("¡Proveedor modificado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al modificar ¡Proveedor, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Faltan datos");
      
    }
  }
}