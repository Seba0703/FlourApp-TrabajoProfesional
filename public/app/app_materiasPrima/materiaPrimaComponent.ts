import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'tabla-materias-prima',
    templateUrl:"app/app_materiasPrima/materiaPrimaComponent.html"
})

export class MateriaPrimaComponent {
  private materiasPrima: Response;

  private _id : string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private precioVenta: number;
  private tipo: string;

  private mostrarModalModificar: boolean = true;
  
  constructor(private mpService: MateriaPrimaServices){}

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
                      alert("¡Se borro existosamente! Pulse 'Aceptar' para actualizar y visualizar los cambios");
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
    this.nombre =             materiaPrima.nombre;
    this.cantidad =           materiaPrima.cantidad;
    this.unidad =              materiaPrima.unidad;
    this.stockMin =          materiaPrima.stockMin;
    this.stockMax =           materiaPrima.stockMax;
    this.tipo =               materiaPrima.tipo;
    this.precioVenta=        materiaPrima.precioVenta;
  }

  guardarModificaciones(){
    if(this.nombre && this.cantidad && this.unidad && this.stockMin && this.stockMax && this.precioVenta && this.tipo){
      this.mostrarModalModificar = false;
      let materiaPrima = {
          _id:                this._id,
          nombre:             this.nombre,
          cantidad:           this.cantidad,
          unidad:             this.unidad,
          stockMin:           this.stockMin,
          stockMax:           this.stockMax,
          tipo:               this.tipo,
          precioVenta:        this.precioVenta
      }
      
      console.log(materiaPrima);

      this.mpService.modificar(materiaPrima)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("¡Materia Prima modificado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al modificar Materia Prima, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Faltan datos");
      
    }
  }
}