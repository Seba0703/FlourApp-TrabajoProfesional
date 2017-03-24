import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ClienteServices } from './clienteServices';
import { ListaDePrecioServices} from '../app_listaDePrecios/ListaDePrecioServices';

@Component({
  selector: 'tabla-clientes',
  templateUrl: "app/app_clientes/clienteComponent.html"
})

export class ClienteComponent {
  private accionesEjecutables: string;//ejecutables sobre este component

  private clientes: Response;

  private _id : string;
  private nombreEmpresa: string;
  private cuitViejo: string;
  private cuit: string;
  private categoriaFiscal: string;
  private listaPrecioNombreSeleccionada: string;
  private direccion: string;
  private condicionPago: string;

  private listaDePreciosDisponible: Array<string>;
  private cuitsExistentes: Array<string>;

  private mostrarModalModificar: boolean = true;
  
  constructor(private cService: ClienteServices, private lpService: ListaDePrecioServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    this.accionesEjecutables = dataLogin.permisos;

    this.listaDePreciosDisponible = new Array<string>();
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarClientes();
    this.cargarCUITsExistentes();
  }

  cargarClientes(){
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

    this.lpService.getListaDePrecios()
                  .subscribe(
                    (listaDePreciosInDataBase) => {
                      for(let elementoLDPinDB of listaDePreciosInDataBase){
                        this.listaDePreciosDisponible.push(elementoLDPinDB.nombre);
                      }
                      this.listaDePreciosDisponible = Array.from(new Set(this.listaDePreciosDisponible));//filtro repetidos
                      
                      console.log(this.listaDePreciosDisponible);
                    },
                    error => {
                            console.log(JSON.stringify(error.json()));
                            alert("\t\t\t¡ERROR al cargar Lista De Precios!");
                        }
                  );
  }

  cargarCUITsExistentes(){
    this.cService.getBasicDataClientes()
                 .subscribe((basicDataClientesInDataBase) => this.cuitsExistentes = basicDataClientesInDataBase.map(function(bdCliente) {return bdCliente.cuit}), 
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
    this._id =                            cliente._id;
    this.nombreEmpresa =                  cliente.nombreEmpresa;
    this.cuitViejo =                      cliente.cuit;
    this.cuit =                           cliente.cuit;
    this.categoriaFiscal =                cliente.categoriaFiscal;
    this.listaPrecioNombreSeleccionada =  cliente.listaPrecioNombre;
    this.direccion =                      cliente.direccion;
    this.condicionPago =                  cliente.condicionPago;
  }

  guardarModificaciones(){
    if(this.cuit == null || this.cuit == this.cuitViejo) {
      if(this.nombreEmpresa){
        this.mostrarModalModificar = false;
        let cliente = {
            _id:                this._id,
            nombreEmpresa:      this.nombreEmpresa,
            cuit:               this.cuit,
            categoriaFiscal:    this.categoriaFiscal,
            listaPrecioNombre:  this.listaPrecioNombreSeleccionada,
            direccion:          this.direccion,
            condicionPago:      this.condicionPago
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
    } else if(this.elCUITseRepite()) {
              alert("\t¡ERROR! Ya existe un cliente con ese CUIT")
    } 
  }


  elCUITseRepite(): boolean {
    for (let cuit of this.cuitsExistentes){
      if(this.cuit == cuit) return true; //this.cuit es el cuit insertado en el input
    }
    return false;
  }

}