import { Component } from '@angular/core';
import { ProductoTerminadoServices } from './productoTerminadoServices';

@Component({
  selector: 'agregar-producto-terminado',
  templateUrl: 'app/app_productosTerminados/agregadorProductoTerminadoComponent.html'
})
export class AgregadorProductoTerminadoComponent{
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
  
  constructor(private ptService: ProductoTerminadoServices){}

  agregar() {
    if(this.tasaImpositiva && this.nombre && this.cantidad && this.unidad && this.stockMin && this.stockMax && this.embolsado && this. porcentajeMerma && this.tipo && this.precioVenta) { 
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
      let productoTerminado = {
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
      
      console.log(productoTerminado);

      this.ptService.agregarProductoTerminado(productoTerminado)
                    .subscribe(data => {
                        console.log("producto creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("¡Producto terminado agregado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al agregar Producto terminado, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Faltan datos");
    }
  }

}