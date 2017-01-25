import { Component } from '@angular/core';
import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private tasaImpositiva: string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsadoCantDefault: number;
  private tipo: string;
  private precioVenta: number;


  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: MateriaPrimaServices){}

  agregar() {
    if(this.nombre && this.stockMin && this.stockMax) {
      let tasaImpositivaID: string;
      if(this.tasaImpositiva) {
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
      }
      let materiaPrima = {
          tasaImpositivaID:   tasaImpositivaID,
          nombre:             this.nombre,
          cantidad:           this.cantidad,
          unidad:             this.unidad,
          stockMin:           this.stockMin,
          stockMax:           this.stockMax,
          embolsadoCantDefault: this.embolsadoCantDefault,
          tipo:               this.tipo,
          precioVenta:        this.precioVenta
      }
      
      console.log(materiaPrima);

      this.ptService.agregarMateriaPrima(materiaPrima)
                    .subscribe(data => {
                        console.log("materiaPrima creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("\t\t\t\t¡Materia Prima agregada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al agregar Materia Prima!\n\nrevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nCampos obligatorios: Nombre - Stock Min - Stock Max");
    }
  }

}