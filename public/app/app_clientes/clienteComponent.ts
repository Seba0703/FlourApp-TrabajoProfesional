import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ClienteServices } from './clienteServices';

@Component({
  selector: 'tabla-clientes',
  templateUrl: "app/app_clientes/clienteComponent.html"
})

export class ClienteComponent {
  private nombreUsuario: string;
  private permisos: string;

  private clientes: Response;

  private _id : string;
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscal: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPago: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private cService: ClienteServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;
  }

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
                      alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
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
    this.categoriaFiscal =    cliente.categoriaFiscal;
    this.listaPrecioID =      cliente.listaPrecioID;
    this.direccion =          cliente.direccion;
    this.condicionPago =    cliente.condicionPago;
  }

  guardarModificaciones(){
    if(this.nombreEmpresa){
      this.mostrarModalModificar = false;
      let cliente = {
          _id:                this._id,
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscal:    this.categoriaFiscal,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPago:    this.condicionPago
      }
      
      console.log(cliente);

      this.cService.modificar(cliente)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("\t\t\t\t¡Cliente modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al modificar Cliente!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }

}