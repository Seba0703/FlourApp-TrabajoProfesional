import { Component } from '@angular/core';
import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private precioVenta: number;
  private tipo: string;
  private porcentajeMerma: number;

  constructor(private ptService: MateriaPrimaServices){}

  agregar() {
    let materiaPrima = {
        cantidad:            this.cantidad,
        unidad:              this.unidad,
        stockMin:           this.stockMin,
        stockMax:           this.stockMax,
        porcentajeMerma:    this.porcentajeMerma,
        tipo:               this.tipo,
        precioVenta:        this.precioVenta
    }
    
    console.log(materiaPrima);

    this.ptService.agregarMateriaPrima(materiaPrima)
                  .subscribe(data => {
                      console.log("materiaPrima creado!!!");
                      console.log(data);
                      alert("¡Materia Prima agregada! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                  }, error => {
                      console.log(JSON.stringify(error.json()));
                      alert("ERROR al agregar Producto, revise los campos");
                  });;

  }

}