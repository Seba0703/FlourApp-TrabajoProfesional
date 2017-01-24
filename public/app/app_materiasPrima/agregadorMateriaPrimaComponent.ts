import { Component } from '@angular/core';
import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private listaPrecioID: string;
  private tasaImpositivaID: string;
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
      let materiaPrima = {
          listaPrecioID:      this.listaPrecioID,
          tasaImpositivaID:   this.tasaImpositivaID,
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