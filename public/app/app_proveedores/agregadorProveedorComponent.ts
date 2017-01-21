import { Component } from '@angular/core';
import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'agregar-proveedores',
  templateUrl: 'app/app_proveedores/agregadorProveedorComponent.html'
})

export class AgregadorProveedorComponent {
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscalID: string;
  private listaPrecioID: string;
  private direccion: string;
  private condicionPagoID: string;

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: ProveedorServices){}

  agregar() {

    if(this.nombreEmpresa){
      let proveedor = {
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscalID:  this.categoriaFiscalID,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPagoID:    this.condicionPagoID
      }
      
      console.log(proveedor);

      this.ptService.agregarProveedor(proveedor)
                    .subscribe(data => {
                        console.log("proveedor creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("¡Proveedor agregado! Pulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("ERROR al agregar Proveedor, revise los campos");
                    });;
    } else {
      alert("¡ERROR! Debe proporcionar al menos un nombre");
    }



  }
}