import { Component } from '@angular/core';
import { ProveedorServices } from './proveedorServices';

@Component({
  selector: 'agregar-proveedores',
  templateUrl: 'app/app_proveedores/agregadorProveedorComponent.html'
})

export class AgregadorProveedorComponent {
  private nombreEmpresa: string;
  private cuit: string;
  private categoriaFiscal: string;
  private direccion: string;
  private condicionPago: string;

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: ProveedorServices){}

  agregar() {

    if(this.nombreEmpresa){
      let proveedor = {
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscal:    this.categoriaFiscal,
          direccion:          this.direccion,
          condicionPago:    this.condicionPago
      }
      
      console.log(proveedor);

      this.ptService.agregarProveedor(proveedor)
                    .subscribe(data => {
                        console.log("proveedor creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("\t\t\t\t¡Proveedor agregado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al agregar Proveedor!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }
}