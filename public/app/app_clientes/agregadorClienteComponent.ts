import { Component } from '@angular/core';

import { ClienteServices } from './clienteServices';
import { ListaDePrecioServices} from '../app_listaDePrecios/ListaDePrecioServices';
import {RetencionServices} from "../app_retenciones/retencionServices";
import {Retencion} from "../app_retenciones/retencion";

@Component({
  selector: 'agregar-clientes',
  templateUrl: 'app/app_clientes/agregadorClienteComponent.html'
})

export class AgregadorClienteComponent {
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscal: string;
  private listaPrecioNombreSeleccionada: string;
  private direccion: string;
  private condicionPago: string;

  private listaDePreciosDisponible: Array<string>;
  private cuitsExistentes: Array<string>;

  private retencionesCliente: Retencion[] = [];
  private retenciones: Retencion[];
  // para autocomplete
  public filteredList: Retencion[] = [];
  public query: string = '';
  //retencion seleccionada del autocomplete
    public retencion: Retencion;

  private mostrarModalAgregar: boolean = true;

  constructor(private cService: ClienteServices, private lpService: ListaDePrecioServices, private retencionSrv: RetencionServices){
    this.listaDePreciosDisponible = new Array<string>();
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarListaDePrecios();
    this.cargarCUITsExistentes();
    this.cargarRetenciones();
  }

  cargarListaDePrecios(){
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
                              alert("\t\t\t¡ERROR al cargar Lista De Precios!");
                             }
                            ); 

  }

  cargarRetenciones() {
      this.retencionSrv.getRetenciones().then(retenciones => {
          this.retenciones = retenciones;
          this.filteredList = retenciones;

      })
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

  select(retencion: Retencion){
      this.query = retencion.nombre;
      this.retencion = retencion;
      this.filteredList = this.retenciones;
  }

  agregarRetencion() {
      if (this.retencion && !this.hasRetencion(this.retencion)) {
          this.retencionesCliente.push(this.retencion);
          this.retencion = null;
          this.query = "";
      }
  }

  hasRetencion(retencion: Retencion): boolean {
      var i = 0;
      var hasRetencion = false;
      while (i <  this.retencionesCliente.length && !hasRetencion) {
          if (this.retencionesCliente[i]._id == retencion._id) {
              hasRetencion = true;
          }
          i++;
      }

      return hasRetencion;
  }

  borrarRetencionCliente(i: number) {
      this.retencionesCliente.splice(i,1);
  }

  agregar() {
    if(this.cuit && this.elCUITseRepite()) { 
      alert("\t¡ERROR! Ya existe un cliente con ese CUIT")
    } else  if(this.nombreEmpresa){

            let cliente = {
                nombreEmpresa:      this.nombreEmpresa,
                cuit:               this.cuit,
                categoriaFiscal:    this.categoriaFiscal,
                listaPrecioNombre:  this.listaPrecioNombreSeleccionada,
                direccion:          this.direccion,
                condicionPago:      this.condicionPago,
                retenciones_ids:    this.retencionesCliente
            }
            
            console.log(cliente);

            this.cService.agregarCliente(cliente)
                          .subscribe(data => {
                              console.log("cliente creado!!!");
                              console.log(data);
                              this.mostrarModalAgregar = false;
                              alert("\t\t\t\t¡Cliente agregado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                              window.location.reload();
                          }, error => {
                              console.log(JSON.stringify(error.json()));
                              alert("\t\t\t\t¡ERROR al agregar Cliente!\n\nRevise los campos");
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

