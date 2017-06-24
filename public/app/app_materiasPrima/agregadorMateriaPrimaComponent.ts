import { Component } from '@angular/core';
import { MateriaPrimaServices } from './materiaPrimaServices';
import {Retencion} from "../app_retenciones/retencion";
import {RetencionServices} from "../app_retenciones/retencionServices";

@Component({
  selector: 'agregar-materia-prima',
  templateUrl: 'app/app_materiasPrima/agregadorMateriaPrimaComponent.html'
})

export class AgregadorMateriaPrimaComponent {
  private tasaImpositiva: string;
  private nombre: string;
  private cantidad: number;
  private unidad: string;
  private stockMin: number;
  private stockMax: number;
  private embolsadoCantDefault: number;
  private precioVenta: number;

    private retencionesCliente: Retencion[] = [];
    private retenciones: Retencion[];
    // para autocomplete
    public filteredList: Retencion[] = [];
    public query: string = '';
    //retencion seleccionada del autocomplete
    public retencion: Retencion;

  private mostrarModalAgregar: boolean = true;

  constructor(private ptService: MateriaPrimaServices, private retencionSrv: RetencionServices){}

    ngOnInit() {
      this.cargarRetenciones();
    }

  agregar() {
    if(this.nombre && this.stockMin && this.stockMax) {
      let tasaImpositivaID: string;
      if(this.tasaImpositiva) {
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
      }
      let materiaPrima = {
          tasaImpositivaID:   tasaImpositivaID,
          nombre:             this.nombre,
          cantidad:           this.cantidad,
          unidad:             this.unidad,
          stockMin:           this.stockMin,
          stockMax:           this.stockMax,
          embolsadoCantDefault: this.embolsadoCantDefault,
          tipo:               "1",
          precioVenta:        this.precioVenta,
          retenciones_ids: this.retencionesCliente
      }
      
      console.log(materiaPrima);

      this.ptService.agregarMateriaPrima(materiaPrima)
                    .subscribe(data => {
                        console.log("materiaPrima creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("\t\t\t\t¡Materia Prima agregada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al agregar Materia Prima!\n\nrevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nCampos obligatorios: Nombre - Stock Min - Stock Max");
    }
  }

    cargarRetenciones() {
        this.retencionSrv.getRetenciones().then(retenciones => {
            this.retenciones = retenciones;
            this.filteredList = retenciones;

        })
    }

    filter() {
        if (this.query !== ""){
            this.filteredList = this.retenciones.filter(function(retencion: Retencion){
                return retencion.nombre.toLowerCase().indexOf(this.query.toLowerCase()) > -1
                    || retencion.codigo.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = this.retenciones;
        }
    }

    select(retencion: Retencion){
        this.query = retencion.nombre;
        this.retencion = retencion;
        this.filteredList = this.retenciones;
    }

    agregarRetencion() {
        if (this.retencion && !this.hasRetencion(this.retencion)) {
            this.retencionesCliente.push(this.retencion);
            this.retencion = null;
            this.query = "";
        }
    }

    hasRetencion(retencion: Retencion): boolean {
        var i = 0;
        var hasRetencion = false;
        while (i <  this.retencionesCliente.length && !hasRetencion) {
            if (this.retencionesCliente[i]._id == retencion._id) {
                hasRetencion = true;
            }
            i++;
        }

        return hasRetencion;
    }

    borrarRetencionCliente(i: number) {
        this.retencionesCliente.splice(i,1);
    }

}