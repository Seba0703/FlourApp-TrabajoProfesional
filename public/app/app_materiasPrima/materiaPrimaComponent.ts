import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'tabla-materias-prima',
    templateUrl:"app/app_materiasPrima/materiaPrimaComponent.html"
})

export class MateriaPrimaComponent {
  private nombreUsuario: string;
  private permisos: string;

  private materiasPrima: Response;

  private _id : string;
  private listaPrecioID: string;
  private tasaImpositivaID: string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsadoCantDefault: number;
  private precioVenta: number;
  private tipo: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private mpService: MateriaPrimaServices){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;
  }

  ngOnInit() {
    console.log("ON INIT");
    this.cargarMateriasPrima();
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
    this.listaPrecioID =      materiaPrima.listaPrecioID;
    this.tasaImpositivaID =   materiaPrima.tasaImpositivaID;
    this.nombre =             materiaPrima.nombre;
    this.cantidad =           materiaPrima.cantidad;
    this.unidad =              materiaPrima.unidad;
    this.stockMin =          materiaPrima.stockMin;
    this.stockMax =           materiaPrima.stockMax;
    this.embolsadoCantDefault = materiaPrima.embolsadoCantDefault;
    this.tipo =               materiaPrima.tipo;
    this.precioVenta=        materiaPrima.precioVenta;
  }

  guardarModificaciones(){
    if(this.nombre && this.stockMin && this.stockMax){
      this.mostrarModalModificar = false;
      let materiaPrima = {
          _id:                  this._id,
          listaPrecioID:        this.listaPrecioID,
          tasaImpositivaID:     this.tasaImpositivaID,
          nombre:               this.nombre,
          cantidad:             this.cantidad,
          unidad:               this.unidad,
          stockMin:             this.stockMin,
          stockMax:             this.stockMax,
          embolsadoCantDefault: this.embolsadoCantDefault,
          tipo:                 this.tipo,
          precioVenta:          this.precioVenta
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
}