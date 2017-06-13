import { Component, Input } from '@angular/core';
// import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'modificar-stock-optimo',
  templateUrl: 'app/app_informeEstado/modalStockOptimoComponent.html'
})

export class StockOptimoComponent {
  private stockMin: number;
  private stockMax: number;
  private optimo: number;
  @Input() nombre: number;
  @Input() cantidad: number;
  @Input() min: number;
  @Input() max: number;
  @Input() recomendacion: number;
  @Input() valor_optimo: string;
  @Input() optimo_actual: string;


  private mostrarModalAgregar: boolean = true;

  // constructor(private ptService: MateriaPrimaServices){}
  constructor(){}
  //
  // agregar() {
  //   if(this.nombre && this.stockMin && this.stockMax) {
  //     let tasaImpositivaID: string;
  //     if(this.tasaImpositiva) {
  //       switch (this.tasaImpositiva.split("-")[1].split("%")[0]) {
  //         case "0":
  //           tasaImpositivaID = "ti1";
  //           break;
  //         case "10.5":
  //           tasaImpositivaID = "ti2";
  //           break;
  //         case "21":
  //           tasaImpositivaID = "ti3";
  //           break;
  //         case "27":
  //           tasaImpositivaID = "ti4";
  //           break;
  //         default:
  //           tasaImpositivaID = "ti1";
  //           break;
  //       }
  //     }
  //     let materiaPrima = {
  //         tasaImpositivaID:   tasaImpositivaID,
  //         nombre:             this.nombre,
  //         cantidad:           this.cantidad,
  //         unidad:             this.unidad,
  //         stockMin:           this.stockMin,
  //         stockMax:           this.stockMax,
  //         embolsadoCantDefault: this.embolsadoCantDefault,
  //         tipo:               "1",
  //         precioVenta:        this.precioVenta
  //     }
  //
  //     console.log(materiaPrima);
  //
  //     this.ptService.agregarMateriaPrima(materiaPrima)
  //                   .subscribe(data => {
  //                       console.log("materiaPrima creado!!!");
  //                       console.log(data);
  //                       this.mostrarModalAgregar = false;
  //                       alert("\t\t\t\t¡Materia Prima agregada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
  //                       window.location.reload();
  //                   }, error => {
  //                       console.log(JSON.stringify(error.json()));
  //                       alert("\t\t\t\t¡ERROR al agregar Materia Prima!\n\nrevise los campos");
  //                   });;
  //   } else {
  //     alert("\t\t\t\t¡ERROR!\n\nCampos obligatorios: Nombre - Stock Min - Stock Max");
  //   }
  // }

}
