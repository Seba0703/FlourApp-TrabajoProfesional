import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'tabla-materias-prima',
    template: `
        <table class="table">
          <thead class="thead-inverse">
          <tr>
          	<th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody *ngFor="let materiaPrima of materiasPrima">
			<td>{{materiaPrima.nombre}}</td>
            <td>{{materiaPrima.cantidad}}</td>
            <td>{{materiaPrima.unidad}}</td>
            <td>{{materiaPrima.stockMin}}</td>
            <td>{{materiaPrima.stockMax}}</td>
            <td>{{materiaPrima.tipo}}</td>
            <td>{{materiaPrima.precioVenta}}</td>
            <td>
                <button type="button" class="btn btn-success" (click)="modificar()" title="Modificar" >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-danger" (click)="borrar(materiaPrima._id)" title="Borrar" >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
          </tbody>
        </table>
  `
})

export class MateriaPrimaComponent {
  private materiasPrima: Response;
  
  constructor(private ptService: MateriaPrimaServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarMateriasPrima();
  }

  cargarMateriasPrima(){
    console.log("CARGANDO MateriaPrima");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getMateriasPrima()
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
        this.ptService.borrarMateriaPrima(id)
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
}