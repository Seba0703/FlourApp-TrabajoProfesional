import { Component } from '@angular/core';
import { SemiProcesadoServices } from './semiProcesadoServices';

@Component({
  selector: 'agregar-semi-procesado',
  templateUrl: 'app/app_semiProcesados/agregadorSemiProcesadoComponent.html'
})

export class AgregadorSemiProcesadoComponent {
  private listaPrecioID: string;
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

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: SemiProcesadoServices){}

  agregar() {
    if(this.nombre && this.stockMin && this.stockMax) { 
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
          listaPrecioID:      this.listaPrecioID,
          tasaImpositivaID:    tasaImpositivaID,
          nombre:              this.nombre,
          cantidad:            this.cantidad,
          unidad:              this.unidad,
          stockMin:           this.stockMin,
          stockMax:           this.stockMax,
          embolsadoCantDefault: this.embolsado,
          porcentajeMerma:    this.porcentajeMerma,
          tipo:               this.tipo,
          precioVenta:        this.precioVenta
      }
      
      console.log(semiProcesado);

      this.ptService.agregarSemiProcesado(semiProcesado)
                    .subscribe(data => {
                        console.log("producto creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("¡Producto semiprocesado agregado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al agregar Producto semiprocesado, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Campos obligatorios: Nombre - Stock Min - Stock Max");
    }
  }
}