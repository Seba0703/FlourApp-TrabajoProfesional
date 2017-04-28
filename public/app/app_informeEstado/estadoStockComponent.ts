import { Component, Input } from '@angular/core';
import { InformesServices } from '../app_informes/informesServices';

@Component({
  selector: 'estado-stock',
  templateUrl: 'app/app_informeEstado/estadoStockComponent.html'
})
export class EstadoStockComponent {
  constructor(private iService: InformesServices) {}
  public informeEstadoStock:any = []

  getInformeEstadoStock() {
    return JSON.stringify(this.informeEstadoStock);
  }

  ngOnInit() {
      this.reqInformeEstadoStock();
  }

  reqInformeEstadoStock() {
    this.informeEstadoStock = [];
    this.iService.getEstadoStock().subscribe(
      (informeData) => {
        this.informeEstadoStock = informeData;
        console.log(informeData);
      },
      err => console.error("EL ERROR FUE: ", err)
    );
  }
}
