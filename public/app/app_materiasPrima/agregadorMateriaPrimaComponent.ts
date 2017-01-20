import { Component } from '@angular/core';
import { MateriaPrimaServices } from './materiaPrimaServices';

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private precioVenta: number;
  private tipo: string;

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: MateriaPrimaServices){}

  agregar() {
    if(this.nombre && this.cantidad && this.unidad && this.stockMin && this.stockMax && this.precioVenta && this.tipo) {
      let materiaPrima = {
          nombre:             this.nombre,
          cantidad:           this.cantidad,
          unidad:             this.unidad,
          stockMin:           this.stockMin,
          stockMax:           this.stockMax,
          tipo:               this.tipo,
          precioVenta:        this.precioVenta
      }
      
      console.log(materiaPrima);

      this.ptService.agregarMateriaPrima(materiaPrima)
                    .subscribe(data => {
                        console.log("materiaPrima creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("¡Materia Prima agregada! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al agregar Producto, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Faltan datos");
    }


  }

}