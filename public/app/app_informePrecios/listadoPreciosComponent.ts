import { Component, Input } from '@angular/core';
import { InformesServices } from '../app_informes/informesServices';

@Component({
  selector: 'listado-precios',
  templateUrl: 'app/app_informePrecios/listadoPreciosComponent.html'
})
export class ListadoPreciosComponent {
  constructor(private iService: InformesServices) {}
  public informePrecios:any = {};
  public materiasPrima:any = [];
  public semiProcesados:any = [];
  public productosTerminados:any = [];
  public productoSeleccionado:any = {};
  public mensajeError: string= "";
  searchFields = {
    desde: "",
    hasta: ""
  }

  showDesde:boolean = false;
  showHasta:boolean = false;

  getSeleccionado() {
    if(this.productoSeleccionado.nombre != undefined)
      return this.productoSeleccionado.nombre;
    else return "Seleccione Producto";
  }

  seleccionarProducto(producto:any) {
    this.productoSeleccionado = producto;
  }

  ngOnInit() {
    this.reqProductos();
  }

  reqInformePrecios() {
    this.informePrecios = {};
    this.iService.getEstadoPrecios(this.productoSeleccionado,this.searchFields).subscribe(
      (informeData) => {
        this.informePrecios = informeData;
        if(this.noHayDatos())
          this.mensajeError = "No hay datos en ese rango.";
        else
          this.mensajeError = "";
      },
      err => console.error("EL ERROR FUE: ", err)
    );
  }

  noHayDatos() {
    return ((this.informePrecios.compra == undefined && this.informePrecios.venta == undefined)
    ||(this.informePrecios.compra.length==0 && this.informePrecios.venta.length==0));
  }

  dateToString(date:Date):string {
    console.log(new Date(date).toLocaleDateString());
    if(date != undefined)
      return new Date(date).toLocaleDateString();
    else return "";
  }

  reqProductos() {
    this.informePrecios = [];
    this.iService.getMateriasPrima().subscribe(
      (materiasPrima) => {
        this.materiasPrima = materiasPrima;
      },
      err => console.error("EL ERROR FUE: ", err)
    );
    this.iService.getSemiProcesados().subscribe(
      (semiProcesados) => {
        this.semiProcesados = semiProcesados;
      },
      err => console.error("EL ERROR FUE: ", err)
    );
    this.iService.getProductosTerminados().subscribe(
      (productosTerminados) => {
        this.productosTerminados = productosTerminados;
      },
      err => console.error("EL ERROR FUE: ", err)
    );
  }

  toogleShowDesde(val:boolean) {
    this.showDesde=val;
  }

  toogleShowHasta(val:boolean) {
    this.showHasta=val;
  }

  fecha(event:any) {
    this.toogleShowDesde(false);
    this.toogleShowHasta(false);
    if(event.tipo=="desde")
      this.searchFields.desde=event.value.toISOString().slice(0,10);
    else if(event.tipo=="hasta")
      this.searchFields.hasta=event.value.toISOString().slice(0,10);
  }
}
