import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SemiProcesadoServices } from './semiProcesadoServices';

@Component({
  selector: 'tabla-semi-procesados',
    template: `
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Min</th>
            <th>Stock Max</th>
            <th>Embolsado (default)</th>
            <th>Porcentaje Merma</th>
            <th>Tipo</th>
            <th>Precio Venta</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody *ngFor="let semiProcesado of semiProcesados">
            <td>{{semiProcesado.cantidad}}</td>
            <td>{{semiProcesado.unidad}}</td>
            <td>{{semiProcesado.stockMin}}</td>
            <td>{{semiProcesado.stockMax}}</td>
            <td>{{semiProcesado.embolsadoCantDefault}}</td>
            <td>{{semiProcesado.porcentajeMerma}}%</td>
            <td>{{semiProcesado.tipo}}</td>
            <td>{{semiProcesado.precioVenta}}</td>
            <td>
                <button type="button" class="btn btn-success" (click)="modificar()" title="Modificar" >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-danger" (click)="borrar(semiProcesado._id)" title="Borrar" >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
          </tbody>
        </table>
  `
})

export class SemiProcesadoComponent implements OnInit{
  private semiProcesados: Response;
  
  constructor(private ptService: SemiProcesadoServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarSemiProcesados();
  }

  cargarSemiProcesados(){
    console.log("CARGANDO PRODUCTOS TERM");
    // en el momento del subscribe es cuando se dispara la llamada
    this.ptService.getSemiProcesados()
              .subscribe(
                (semiProcesadosData) => {
                  this.semiProcesados = semiProcesadosData;
                  console.log(this.semiProcesados);
                },
                err => console.error("EL ERROR FUE: ", err)
              );
  }

  borrar(id: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("ID borrado= " + id);
        this.ptService.borrarSemiProcesado(id)
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