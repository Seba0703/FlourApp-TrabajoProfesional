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

  showDesde:boolean = false;
  showHasta:boolean = false;

  toogleShowDesde(val:boolean) {
    this.showDesde=val;
  }

  toogleShowHasta(val:boolean) {
    this.showHasta=val;
  }

  DateToFormattedString(d:Date) {
        var yyyy = d.getFullYear().toString();
        var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = d.getDate().toString();

        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
   };

  fecha(event:any) {
    this.toogleShowDesde(false);
    this.toogleShowHasta(false);
    if(event.tipo=="desde")
      this.searchFields.desde=event.value.toISOString().slice(0,10);
    else if(event.tipo=="hasta")
      this.searchFields.hasta=event.value.toISOString().slice(0,10);
  }

  doSearch(event:any) {
    this.iService.getFacturas(this.searchFields).subscribe(
      (informeData) => {
        this.searchPerformed.emit(informeData);
      },
      err => console.error("EL ERROR FUE: ", err)
    );
  }
}
