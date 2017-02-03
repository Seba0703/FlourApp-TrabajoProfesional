import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ComponenteSeleccionado } from './componenteSeleccionado';

import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';

@Component({
  selector: 'tabla-semi-procesados',
    templateUrl: "app/app_semiProcesados/semiProcesadoComponent.html"
})

export class SemiProcesadoComponent implements OnInit{
  private nombreUsuario: string;
  private permisos: string;

  private componentesSeleccionados: Array<ComponenteSeleccionado>;
  private componentesDisponibles: Array<any>;

  private semiProcesados: Response;

  private _id : string;
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

  private idProductoActual: string;

  private mostrarModalModificar: boolean = true;
  private mostrarModalComponentes: boolean = true;
  
  constructor(
    private mpService: MateriaPrimaServices,
    private spService: SemiProcesadoServices,
    private ptService: ProductoTerminadoServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;

    this.componentesDisponibles = new Array<any>();
    this.componentesSeleccionados = new Array<ComponenteSeleccionado>();
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarSemiProcesados();
  }

  cargarSemiProcesados(){
    console.log("CARGANDO PRODUCTOS TERM");
    // en el momento del subscribe es cuando se dispara la llamada
    this.spService.getSemiProcesados()
              .subscribe(
                (semiProcesadosData) => {
                  this.semiProcesados = semiProcesadosData;
                  console.log(this.semiProcesados);
                },
                err => console.error("EL ERROR FUE: ", err)
              );

    this.cargarComponentesDisponibles();



  }

  cargarComponentesDisponibles() {
    this.componentesDisponibles = new Array<any>();

    this.mpService.getBasicDataMateriasPrima()
            .subscribe(
              materiasPrimas => {
                this.componentesDisponibles.push.apply(this.componentesDisponibles, materiasPrimas);

                this.spService.getBasicDataSemiProcesados()
                        .subscribe(
                          sp => {
                            this.componentesDisponibles.push.apply(this.componentesDisponibles, sp);

                            this.ptService.getBasicDataProductosTerminados()
                                    .subscribe(
                                      pt => {
                                        this.componentesDisponibles.push.apply(this.componentesDisponibles, pt);

                                        console.log("COMPONENTES DISPONIBLES CARGADOS= " + this.componentesDisponibles);
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

  componentes(idProductoSeleccionado: string){
    this.idProductoActual = idProductoSeleccionado;

    //this.componentesSeleccionados = new Array<ComponenteSeleccionado>();
    this.cargarComponentesDisponibles();
  }

  guardarComponentes(){
      for (let componenteSeleccionado of this.componentesSeleccionados){
        let componenteBody = {
          productoAFabricarID: this.idProductoActual,
          productoNecesarioID: componenteSeleccionado.id,
          porcentajeNecesario: componenteSeleccionado.porcentaje
        }

        this.spService.agregarComponente(componenteBody)
                        .subscribe(data => {
                            console.log(data);
                        }, error => {
                            console.log(JSON.stringify(error.json()));
                            alert("\t\t\t¡ERROR Lista De Precio!\n\nRevise los campos");
                        });

      }

  }

  onChange(id: string, nombre: string, porcentaje: number, tipo: string, valorCheck:boolean){
      if(valorCheck == true) {
        this.componentesSeleccionados.push(new ComponenteSeleccionado(id, nombre, porcentaje, tipo));
      } else {
        for (let componenteSeleccionado of this.componentesSeleccionados){
          if(componenteSeleccionado.id == id) {
            let index = this.componentesSeleccionados.indexOf(componenteSeleccionado);
            this.componentesSeleccionados.splice(index, 1);
          }
        }
      }
      console.log(id+" : "+nombre+" : "+valorCheck);
  }

  onPorcentajeChange(porcentaje: number, id: string){
    for (var i = 0; i < this.componentesSeleccionados.length; ++i) {
      if(this.componentesSeleccionados[i].id == id) {
        this.componentesSeleccionados[i].porcentaje = porcentaje;
      }
    }
  }

  fueSeleccionada(idComponente: string): boolean {
    return false;
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.spService.borrarSemiProcesado(id)
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

  modificar(semiProcesado: any){
    this._id =                semiProcesado._id;

    switch (semiProcesado.tasaImpositivaID) {
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

    this.nombre =             semiProcesado.nombre;
    this.cantidad =           semiProcesado.cantidad;
    this.unidad =              semiProcesado.unidad;
    this.stockMin =          semiProcesado.stockMin;
    this.stockMax =           semiProcesado.stockMax;
    this.embolsado =           semiProcesado.embolsadoCantDefault;
    this.porcentajeMerma =     semiProcesado.porcentajeMerma;
    this.tipo =               semiProcesado.tipo;
    this.precioVenta=        semiProcesado.precioVenta;
  }

  guardarModificaciones(){
    if(this.nombre && this.stockMin && this.stockMax ) { 
      if((this.porcentajeMerma && this.porcentajeMerma<=100) || (!this.porcentajeMerma)){
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
        let semiProcesado = {
            _id:                  this._id,
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
        
        console.log(semiProcesado);

        this.spService.modificar(semiProcesado)
                      .subscribe(data => {
                          console.log(data);
                          alert("\t\t¡Producto semiprocesado modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                          window.location.reload();                        
                      }, error => {
                          console.log(JSON.stringify(error.json()));
                          alert("\t\t\t\t¡ERROR al modificar Producto semiprocesado!\n\nRevise los campos");
                      });;

      } else {
        alert("¡ERROR en porcentaje de merma!\n\nRecuerde que el porcentaje de merma no puede ser mayor que 100%");
      }

    } else {
      alert("¡ERROR en campo/s!\n\nRecuerde que 'Nombre - Stock Min - Stock Max' son obligatorios y que el porcentaje de merma no puede ser mayor que 100%");
    }
  }

}