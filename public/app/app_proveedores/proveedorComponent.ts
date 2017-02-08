import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'tabla-proveedores',
    templateUrl: "app/app_proveedores/proveedorComponent.html"
})

export class ProveedorComponent {
  private nombreUsuario: string;
  private permisos: string;

  private proveedores: Response;

  private _id : string;
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscal: string;
  private direccion: string;
  private condicionPago: string;

  private cuitsExistentes: Array<string>;

  private mostrarModalModificar: boolean = true;
  
  constructor(private pService: ProveedorServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProveedores();
    this.cargarCUITsExistentes();
  }

  cargarProveedores(){
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

  cargarCUITsExistentes(){
    this.pService.getBasicDataProveedores()
                 .subscribe((basicDataProveedoresInDataBase) => this.cuitsExistentes = basicDataProveedoresInDataBase.map(function(bdProveedor) {return bdProveedor.cuit}), 
                             error => {
                              console.log(JSON.stringify(error.json()));
                              alert("\t\t\t¡ERROR al cargar CUITS existentes!");
                             }
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
                      alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
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
    this.categoriaFiscal =    proveedor.categoriaFiscal;
    this.direccion =          proveedor.direccion;
    this.condicionPago =    proveedor.condicionPago;
  }

  guardarModificaciones(){
    if(this.cuit && this.elCUITseRepite()) { 
      alert("\t¡ERROR! Ya existe un proveedor con ese CUIT")
    } else  if(this.nombreEmpresa){
              this.mostrarModalModificar = false;
              let proveedor = {
                  _id:                this._id,
                  nombreEmpresa:      this.nombreEmpresa,
                  cuit:               this.cuit,
                  categoriaFiscal:    this.categoriaFiscal,
                  direccion:          this.direccion,
                  condicionPago:    this.condicionPago
              }
              
              console.log(proveedor);

              this.pService.modificar(proveedor)
                            .subscribe(data => {
                                console.log(data);
                                
                                alert("\t\t\t\t¡Proveedor modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                                window.location.reload();                        
                            }, error => {
                                console.log(JSON.stringify(error.json()));
                                alert("\t\t\t\t¡ERROR al modificar Proveedor!\n\nrevise los campos");
                            });;
            } else {
              alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
            }
  }

  elCUITseRepite(): boolean {
    for (let cuit of this.cuitsExistentes){
      if(this.cuit == cuit) return true; //this.cuit es el cuit insertado en el input
    }
    return false;
  }
}