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

  private cuitsExistentes: Array<string>;

  private mostrarModalAgregar: boolean = true;

  constructor(private pService: ProveedorServices){}

  ngOnInit() {
    console.log("ON INIT");
    this.cargarCUITsExistentes();
  }

  cargarCUITsExistentes(){
    this.pService.getBasicDataProveedores()
                 .subscribe((basicDataProveedoresInDataBase) => this.cuitsExistentes = basicDataProveedoresInDataBase.map(function(bdProveedor) {return bdProveedor.cuit}), 
                             error => {
                              console.log(JSON.stringify(error.json()));
                              alert("\t\t\t¡ERROR al cargar CUITS existentes!");
                             }
                            ); 

  }

  agregar() {
    if(this.cuit && this.elCUITseRepite()) { 
      alert("\t¡ERROR! Ya existe un proveedor con ese CUIT")
    } else  if(this.nombreEmpresa){
              let proveedor = {
                  nombreEmpresa:      this.nombreEmpresa,
                  cuit:               this.cuit,
                  categoriaFiscal:    this.categoriaFiscal,
                  direccion:          this.direccion,
                  condicionPago:    this.condicionPago
              }
              
              console.log(proveedor);

              this.pService.agregarProveedor(proveedor)
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

  elCUITseRepite(): boolean {
    for (let cuit of this.cuitsExistentes){
      if(this.cuit == cuit) return true; //this.cuit es el cuit insertado en el input
    }
    return false;
  }
}