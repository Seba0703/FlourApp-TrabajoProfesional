import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ClienteServices } from './clienteServices';

@Component({
  selector: 'tabla-clientes',
  templateUrl: "app/app_clientes/clienteComponent.html"
})

export class ClienteComponent {
  private clientes: Response;

  private _id : string;
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscalID: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPagoID: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private cService: ClienteServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarProductosTerminados();
  }

  cargarProductosTerminados(){
    console.log("CARGANDO CLIENTES");
    // en el momento del subscribe es cuando se dispara la llamada
    this.cService.getClientes()
              .subscribe(
                (clientesData) => {
                  this.clientes = clientesData;
                  console.log(this.clientes);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.cService.borrarCliente(id)
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

  modificar(cliente: any){
    this._id =                cliente._id;
    this.nombreEmpresa =      cliente.nombreEmpresa;
    this.cuit =               cliente.cuit;
    this.categoriaFiscalID =  cliente.categoriaFiscalID;
    this.listaPrecioID =      cliente.listaPrecioID;
    this.direccion =          cliente.direccion;
    this.condicionPagoID =    cliente.condicionPagoID;
  }

  guardarModificaciones(){
    if(this.nombreEmpresa && this.cuit && this.categoriaFiscalID && this.listaPrecioID && this.direccion && this.condicionPagoID){
      this.mostrarModalModificar = false;
      let cliente = {
          _id:                this._id,
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscalID:  this.categoriaFiscalID,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPagoID:    this.condicionPagoID
      }
      
      console.log(cliente);

      this.cService.modificar(cliente)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("¡Cliente modificado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al modificar Cliente, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Faltan datos");
      
    }
  }

}