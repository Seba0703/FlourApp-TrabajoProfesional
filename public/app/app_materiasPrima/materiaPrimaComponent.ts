import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MateriaPrimaServices } from './materiaPrimaServices';
import {Retencion} from "../app_retenciones/retencion";
import {RetencionServices} from "../app_retenciones/retencionServices";

@Component({
  selector: 'tabla-materias-prima',
    templateUrl:"app/app_materiasPrima/materiaPrimaComponent.html"
})

export class MateriaPrimaComponent {
  private nombreUsuario: string;
  private permisos: string;

  private materiasPrima: Response;

  private _id : string;
  private tasaImpositiva: string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsadoCantDefault: number;
  private precioVenta: number;

    private retencionesCliente: Retencion[] = [];
    private retenciones: Retencion[];
    // para autocomplete
    public filteredList: Retencion[] = [];
    public query: string = '';
    //retencion seleccionada del autocomplete
    public retencion: Retencion;

  private mostrarModalModificar: boolean = true;
  
  constructor(private mpService: MateriaPrimaServices, private retencionSrv: RetencionServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarMateriasPrima();
    this.cargarRetenciones();
  }

  cargarMateriasPrima(){
    console.log("CARGANDO MateriaPrima");
    // en el momento del subscribe es cuando se dispara la llamada
    this.mpService.getMateriasPrima()
              .subscribe(
                (materiasPrimaData) => {
                  this.materiasPrima = materiasPrimaData;
                  console.log(this.materiasPrima);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.mpService.borrarMateriaPrima(id)
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

  modificar(materiaPrima: any){
    this._id =                materiaPrima._id;

    switch (materiaPrima.tasaImpositivaID) {
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

    this.nombre =             materiaPrima.nombre;
    this.cantidad =           materiaPrima.cantidad;
    this.unidad =              materiaPrima.unidad;
    this.stockMin =          materiaPrima.stockMin;
    this.stockMax =           materiaPrima.stockMax;
    this.embolsadoCantDefault = materiaPrima.embolsadoCantDefault;
    this.precioVenta=        materiaPrima.precioVenta;
    this.retencionesCliente = materiaPrima.retenciones_ids;
  }

  guardarModificaciones(){
    if(this.nombre && this.stockMin && this.stockMax){
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

      let materiaPrima = {
          _id:                  this._id,
          tasaImpositivaID:     tasaImpositivaID,
          nombre:               this.nombre,
          cantidad:             this.cantidad,
          unidad:               this.unidad,
          stockMin:             this.stockMin,
          stockMax:             this.stockMax,
          embolsadoCantDefault: this.embolsadoCantDefault,
          tipo:                 "1",
          precioVenta:          this.precioVenta,
          retenciones_ids: this.retencionesCliente
      }
      
      console.log(materiaPrima);

      this.mpService.modificar(materiaPrima)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("\t\t\t\t¡Materia Prima modificado!\n\n Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al modificar Materia Prima!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nCampos obligatorios: Nombre - Stock Min - Stock Max");
    }
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

}