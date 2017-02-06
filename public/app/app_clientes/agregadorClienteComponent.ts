import { Component } from '@angular/core';

import { ClienteServices } from './clienteServices';
import { ListaDePrecioServices} from '../app_listaDePrecios/ListaDePrecioServices';

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

  private mostrarModalAgregar: boolean = true;

  constructor(private cService: ClienteServices, private lpService: ListaDePrecioServices){
    this.listaDePreciosDisponible = new Array<string>();
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarListaDePrecios();
    this.cargarCUITsExistentes();
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
                condicionPago:      this.condicionPago
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

