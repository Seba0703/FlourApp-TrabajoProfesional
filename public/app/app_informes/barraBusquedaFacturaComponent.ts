import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InformesServices } from './informesServices';

@Component({
  selector: 'search-bar-factura',
  templateUrl: "app/app_informes/barraBusquedaFacturaComponent.html"
})

export class BarraBusquedaFacturaComponent {
  @Input() tipo: string;
  @Output() searchPerformed = new EventEmitter();

  constructor(private iService: InformesServices) {}

  ngOnInit() {
    this.searchFields.tipo = this.tipo;
  }

  searchFields = {
    tipo: "",
    numeroFactura: "",
    cuit: "",
    nombreEmpresa: "",
    desde: "",
    hasta: ""
  }

  doSearch(event:any) {
    this.iService.getFacturas(this.searchFields).subscribe(
      (informeData) => {
        console.log("OK");
        console.log("informes");
        console.log(informeData);
        this.searchPerformed.emit(informeData);
      },
      err => console.error("EL ERROR FUE: ", err)
    );
  }
}
